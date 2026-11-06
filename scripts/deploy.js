const hre = require("hardhat");

async function main() {
  const RariflatSession = await hre.ethers.getContractFactory("RariflatSession");
  const session = await RariflatSession.deploy();
  await session.waitForDeployment();

  const address = await session.getAddress();
  console.log("RariflatSession deployed to:", address);
  console.log("Chain ID:", (await hre.ethers.provider.getNetwork()).chainId);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
