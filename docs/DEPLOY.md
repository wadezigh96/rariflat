# Deploy RariflatSession on Robinhood Chain

## Network details

| | Mainnet | Testnet |
|---|---------|---------|
| Chain ID | 4663 | 46630 |
| RPC (public) | https://rpc.mainnet.chain.robinhood.com | https://rpc.testnet.chain.robinhood.com |
| Explorer | https://robinhoodchain.blockscout.com | https://explorer.testnet.chain.robinhood.com |
| Gas token | ETH | ETH |

$wif token: `0x5173b8ea6923c2d40267890d45c46a3480954773`

## Setup

```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
```

Create `.env`:

```env
PRIVATE_KEY=0xYourPrivateKey
ROBINHOOD_RPC=https://rpc.mainnet.chain.robinhood.com
# or for testnet:
# ROBINHOOD_TESTNET_RPC=https://rpc.testnet.chain.robinhood.com
```

## Deploy

Testnet first:

```bash
npx hardhat run scripts/deploy.js --network robinhoodTestnet
```

Mainnet:

```bash
npx hardhat run scripts/deploy.js --network robinhood
```

## After deploy

1. Verify on Blockscout if desired.
2. Update the frontend with the deployed contract address.
3. Users must `approve` the session contract for the $wif amount they want to allow.
4. Call `createSession(agent, spendCap, duration, shadowMode, allowlistHash)`.
5. Agent calls `attemptSpend` then `executeSpend` to move $wif within the cap.

## Flywheel note

Every successful `executeSpend` is an on-chain $wif transfer. Those transfers can later be indexed to boost agent rarity scores.
