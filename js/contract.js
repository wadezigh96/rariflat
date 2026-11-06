// Rariflat contract interaction helpers (ethers v6)
// Replace CONTRACT_ADDRESS after deploy.

const CONTRACT_ADDRESS = "0xYourDeployedRariflatSessionAddress"; // <-- set after deploy
const WIF_ADDRESS = "0x5173b8ea6923c2d40267890d45c46a3480954773";
const CHAIN_ID = 4663; // 46630 for testnet

const SESSION_ABI = [
  "function createSession(address agent, uint256 spendCap, uint256 duration, bool shadowMode, bytes32 allowlistHash) external returns (bytes32)",
  "function attemptSpend(bytes32 id, uint256 amount) external returns (bool)",
  "function executeSpend(bytes32 id, address to, uint256 amount) external returns (bool)",
  "function revoke(bytes32 id) external",
  "function remaining(bytes32 id) external view returns (uint256)",
  "function getSession(bytes32 id) external view returns (tuple(address user, address agent, uint256 spendCap, uint256 spent, uint256 expiresAt, bool shadowMode, bool active, bytes32 allowlistHash))",
  "event SessionCreated(bytes32 indexed id, address indexed user, address indexed agent, uint256 spendCap, uint256 expiresAt, bool shadowMode)",
  "event SpendExecuted(bytes32 indexed id, address indexed to, uint256 amount)"
];

const ERC20_ABI = [
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function allowance(address owner, address spender) external view returns (uint256)",
  "function balanceOf(address account) external view returns (uint256)",
  "function decimals() external view returns (uint8)"
];

async function getProvider() {
  if (!window.ethereum) throw new Error("No injected wallet");
  const provider = new ethers.BrowserProvider(window.ethereum);
  const network = await provider.getNetwork();
  if (Number(network.chainId) !== CHAIN_ID) {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x" + CHAIN_ID.toString(16) }],
      });
    } catch (e) {
      // chain not added — user must add Robinhood Chain manually
      throw new Error("Please switch to Robinhood Chain (chainId " + CHAIN_ID + ")");
    }
  }
  return provider;
}

async function getSigner() {
  const provider = await getProvider();
  return provider.getSigner();
}

async function approveWif(amountWei) {
  const signer = await getSigner();
  const wif = new ethers.Contract(WIF_ADDRESS, ERC20_ABI, signer);
  const tx = await wif.approve(CONTRACT_ADDRESS, amountWei);
  return tx.wait();
}

async function createSession({ agent, spendCapWei, durationSeconds, shadowMode, allowlistHash = ethers.ZeroHash }) {
  const signer = await getSigner();
  const session = new ethers.Contract(CONTRACT_ADDRESS, SESSION_ABI, signer);
  const tx = await session.createSession(agent, spendCapWei, durationSeconds, shadowMode, allowlistHash);
  const receipt = await tx.wait();
  // parse SessionCreated event for the id
  const iface = new ethers.Interface(SESSION_ABI);
  for (const log of receipt.logs) {
    try {
      const parsed = iface.parseLog(log);
      if (parsed && parsed.name === "SessionCreated") {
        return { id: parsed.args.id, txHash: receipt.hash };
      }
    } catch {}
  }
  return { txHash: receipt.hash };
}

async function getRemaining(sessionId) {
  const provider = await getProvider();
  const session = new ethers.Contract(CONTRACT_ADDRESS, SESSION_ABI, provider);
  return session.remaining(sessionId);
}

// Example usage (call from UI after user confirms hire):
// const capWei = ethers.parseUnits("100", 18);
// await approveWif(capWei);
// const { id } = await createSession({
//   agent: "0xAgentAddress...",
//   spendCapWei: capWei,
//   durationSeconds: 7 * 24 * 60 * 60,
//   shadowMode: true
// });
// console.log("Session id:", id);

window.RariflatContract = {
  CONTRACT_ADDRESS,
  WIF_ADDRESS,
  CHAIN_ID,
  approveWif,
  createSession,
  getRemaining,
  getProvider,
  getSigner,
};
