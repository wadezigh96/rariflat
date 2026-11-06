// Standalone ethers.js v6 examples for RariflatSession
// Run in browser console after loading ethers, or adapt for a script.

const CONTRACT = "0xYourDeployedRariflatSessionAddress";
const WIF = "0x5173b8ea6923c2d40267890d45c46a3480954773";
const AGENT = "0xYourAgentAddress"; // replace with real agent address

const SESSION_ABI = [
  "function createSession(address agent, uint256 spendCap, uint256 duration, bool shadowMode, bytes32 allowlistHash) external returns (bytes32)",
  "function executeSpend(bytes32 id, address to, uint256 amount) external returns (bool)",
  "function remaining(bytes32 id) external view returns (uint256)",
  "function revoke(bytes32 id) external",
  "event SessionCreated(bytes32 indexed id, address indexed user, address indexed agent, uint256 spendCap, uint256 expiresAt, bool shadowMode)"
];

const ERC20_ABI = [
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function allowance(address owner, address spender) external view returns (uint256)"
];

async function exampleFullHireFlow() {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const user = await signer.getAddress();

  const wif = new ethers.Contract(WIF, ERC20_ABI, signer);
  const session = new ethers.Contract(CONTRACT, SESSION_ABI, signer);

  const spendCap = ethers.parseUnits("50", 18); // 50 $wif
  const duration = 7 * 24 * 60 * 60; // 7 days

  // 1. Approve session contract to pull $wif
  console.log("Approving...");
  const approveTx = await wif.approve(CONTRACT, spendCap);
  await approveTx.wait();

  // 2. Create session
  console.log("Creating session...");
  const createTx = await session.createSession(
    AGENT,
    spendCap,
    duration,
    true, // shadow mode on
    ethers.ZeroHash
  );
  const receipt = await createTx.wait();

  // 3. Extract session id from event
  const iface = new ethers.Interface(SESSION_ABI);
  let sessionId;
  for (const log of receipt.logs) {
    try {
      const parsed = iface.parseLog(log);
      if (parsed?.name === "SessionCreated") {
        sessionId = parsed.args.id;
        break;
      }
    } catch {}
  }
  console.log("Session created:", sessionId);

  // 4. Check remaining
  const rem = await session.remaining(sessionId);
  console.log("Remaining:", ethers.formatUnits(rem, 18), "$wif");

  return sessionId;
}

// Agent-side example (agent wallet calls this)
async function exampleExecuteSpend(sessionId, recipient, amountWei) {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const session = new ethers.Contract(CONTRACT, SESSION_ABI, signer);

  const tx = await session.executeSpend(sessionId, recipient, amountWei);
  const receipt = await tx.wait();
  console.log("Spend executed:", receipt.hash);
  return receipt;
}

// Revoke example
async function exampleRevoke(sessionId) {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const session = new ethers.Contract(CONTRACT, SESSION_ABI, signer);
  const tx = await session.revoke(sessionId);
  return tx.wait();
}

window.RariflatExamples = {
  exampleFullHireFlow,
  exampleExecuteSpend,
  exampleRevoke,
};
