// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title RariflatSession
 * @notice Skeleton session + spend-cap contract for Rariflat on Robinhood Chain.
 *         Agents can only move up to the user-defined $wif cap within the session window.
 *         Full implementation would add allowlist, shadow mode flag, and on-chain activity tracking.
 *
 * $wif token: 0x5173b8ea6923c2d40267890d45c46a3480954773
 */
interface IERC20 {
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
}

contract RariflatSession {
    address public constant WIF = 0x5173b8ea6923c2d40267890d45c46a3480954773;
    address public owner;

    struct Session {
        address user;
        address agent;
        uint256 spendCap;       // max $wif the agent may move
        uint256 spent;          // $wif already used in this session
        uint256 expiresAt;
        bool shadowMode;        // if true, agent can only observe / propose
        bool active;
    }

    mapping(bytes32 => Session) public sessions;
    uint256 public sessionCount;

    event SessionCreated(bytes32 indexed id, address indexed user, address indexed agent, uint256 spendCap, uint256 expiresAt, bool shadowMode);
    event SpendAttempt(bytes32 indexed id, uint256 amount, bool allowed);
    event SessionRevoked(bytes32 indexed id);

    modifier onlyOwner() {
        require(msg.sender == owner, "not owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function createSession(
        address agent,
        uint256 spendCap,
        uint256 duration,
        bool shadowMode
    ) external returns (bytes32 id) {
        require(agent != address(0), "bad agent");
        require(spendCap > 0, "cap required");
        require(duration > 0 && duration <= 30 days, "bad duration");

        id = keccak256(abi.encodePacked(msg.sender, agent, block.timestamp, sessionCount));
        sessions[id] = Session({
            user: msg.sender,
            agent: agent,
            spendCap: spendCap,
            spent: 0,
            expiresAt: block.timestamp + duration,
            shadowMode: shadowMode,
            active: true
        });
        sessionCount++;

        emit SessionCreated(id, msg.sender, agent, spendCap, block.timestamp + duration, shadowMode);
    }

    /**
     * @notice Called by the agent (or a trusted router) to attempt a $wif spend.
     *         In production this would pull from the user via allowance and enforce allowlist.
     */
    function attemptSpend(bytes32 id, uint256 amount) external returns (bool) {
        Session storage s = sessions[id];
        require(s.active, "inactive");
        require(block.timestamp < s.expiresAt, "expired");
        require(msg.sender == s.agent || msg.sender == owner, "not authorized");

        if (s.shadowMode) {
            emit SpendAttempt(id, amount, false);
            return false;
        }

        if (s.spent + amount > s.spendCap) {
            emit SpendAttempt(id, amount, false);
            return false;
        }

        s.spent += amount;
        emit SpendAttempt(id, amount, true);
        return true;
    }

    function revoke(bytes32 id) external {
        Session storage s = sessions[id];
        require(s.user == msg.sender || msg.sender == owner, "not authorized");
        s.active = false;
        emit SessionRevoked(id);
    }

    function remaining(bytes32 id) external view returns (uint256) {
        Session storage s = sessions[id];
        if (!s.active || block.timestamp >= s.expiresAt) return 0;
        if (s.spent >= s.spendCap) return 0;
        return s.spendCap - s.spent;
    }
}
