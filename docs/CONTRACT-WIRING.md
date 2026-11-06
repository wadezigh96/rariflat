# Wiring the frontend to the deployed contract

## 1. Deploy

Follow `docs/DEPLOY.md`.

After deploy you will have an address, e.g.:
`0x1234...abcd`

## 2. Update the frontend

Open `js/contract.js` and set:

```js
const CONTRACT_ADDRESS = "0x1234...abcd";
```

Optionally change `CHAIN_ID` to `46630` if you deployed on testnet.

## 3. How the hire button works

When the user clicks “Hire with $wif” and has a real wallet:

1. `approveWif(capWei)` — user approves the session contract
2. `createSession({ agent, spendCapWei, durationSeconds, shadowMode })` — creates the on-chain session
3. Session id is parsed from the `SessionCreated` event
4. Status is shown in the modal

If the wallet is simulated, it only shows a confirmation (no chain interaction).

## 4. Agent side

See `js/ethers-examples.js` for:
- `exampleExecuteSpend(sessionId, recipient, amountWei)`
- `exampleRevoke(sessionId)`

## 5. Testing checklist

- [ ] Wallet switches to Robinhood Chain (4663 or 46630)
- [ ] Approve tx succeeds
- [ ] createSession tx succeeds and returns an id
- [ ] `remaining(sessionId)` returns the full cap
- [ ] Shadow mode blocks `executeSpend`
- [ ] Cap is enforced (second spend that exceeds fails)
