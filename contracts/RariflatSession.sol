// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title RariflatSession
 * @notice Session + spend-cap contract for Rariflat on Robinhood Chain.
 *         Users create a time-bounded session for an agent with a $wif spend cap.
 *         The agent (or a trusted router) can only spend up to the cap while the session is active.
 *         Shadow mode blocks all spends.
 *
 * $wif token: 0x5173b8ea6923c2d40267890d45c46a3480954773
 * Chain: Robinhood Chain (4663) / Testnet (46630)
 */
interface IERC20 {
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
}

contract RariflatSession {
    address public constant WIF = 0x5173b8ea6923c2d40267890d45c46a3480954773;
    address public owner;

    struct Session {
        address user;
        address agent;
        uint256 spendCap;       // max $wif the agent may move (18 decimals)
        uint256 spent;          // $wif already used in this session
        uint256 expiresAt;
        bool shadowMode;        // if true, agent can only observe / propose
        bool active;
        bytes32 allowlistHash;  // optional: keccak of allowed function selectors (0 = no restriction)
    }

    mapping(bytes32 => Session) public sessions;
    uint256 public sessionCount;

    event SessionCreated(
        bytes32 indexed id,
        address indexed user,
        address indexed agent,
        uint256 spendCap,
        uint256 expiresAt,
        bool shadowMode
    );
    event SpendAttempt(bytes32 indexed id, uint256 amount, bool allowed, string reason);
    event SessionRevoked(bytes32 indexed id);
    event SpendExecuted(bytes32 indexed id, address indexed to, uint256 amount);

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
        bool shadowMode,
        bytes32 allowlistHash
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
            active: true,
            allowlistHash: allowlistHash
        });
        sessionCount++;

        emit SessionCreated(id, msg.sender, agent, spendCap, block.timestamp + duration, shadowMode);
    }

    /**
     * @notice Attempt a spend. Does not move tokens by itself — call executeSpend after this returns true.
     */
    function attemptSpend(bytes32 id, uint256 amount) external returns (bool) {
        Session storage s = sessions[id];
        require(s.active, "inactive");
        require(block.timestamp < s.expiresAt, "expired");
        require(msg.sender == s.agent || msg.sender == owner, "not authorized");

        if (s.shadowMode) {
            emit SpendAttempt(id, amount, false, "shadow mode");
            return false;
        }

        if (s.spent + amount > s.spendCap) {
            emit SpendAttempt(id, amount, false, "cap exceeded");
            return false;
        }

        emit SpendAttempt(id, amount, true, "ok");
        return true;
    }

    /**
     * @notice Pull $wif from the user (requires prior approve) and record the spend.
     *         Only callable by the agent of the session or the owner.
     */
    function executeSpend(bytes32 id, address to, uint256 amount) external returns (bool) {
        Session storage s = sessions[id];
        require(s.active, "inactive");
        require(block.timestamp < s.expiresAt, "expired");
        require(msg.sender == s.agent || msg.sender == owner, "not authorized");
        require(!s.shadowMode, "shadow mode");
        require(s.spent + amount <= s.spendCap, "cap exceeded");
        require(to != address(0), "bad recipient");

        s.spent += amount;

        bool ok = IERC20(WIF).transferFrom(s.user, to, amount);
        require(ok, "transfer failed");

        emit SpendExecuted(id, to, amount);
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

    function getSession(bytes32 id) external view returns (Session memory) {
        return sessions[id];
    }
}
