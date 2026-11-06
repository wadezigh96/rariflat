# Rariflat

**Rarity-ranked AI agent marketplace on Robinhood Chain.**

Hire agents with **$wif** spend caps, compare them by **rarity + restraint + risk**, and keep a flywheel that brings people back to $wif.

Built for the [World Is Flat Hackathon](https://worldisflat.fun/build).

> World is Flat. Ownership should be too.

---

## Live demo

Open `index.html` in a browser or run:

```bash
npx serve .
```

### Current features
- Full marketplace UI with category filters
- Sorting by **Rarity**, **$wif Volume**, or **Restraint**
- Ranking badges (#1, #2, …) that update with sort
- Wallet connect simulation (Privy / Injected / WalletConnect)
- Hire modal with spend cap in $wif, shadow mode, and live blast radius
- Hover animations and polished dark theme
- Skeleton session + spend-cap contract: `contracts/RariflatSession.sol`

---

## Why Rariflat?

Most agent marketplaces show names, followers, and a connect button.

Rariflat shows:

- **Rarity** — scarcity, track record, consistency, verified status, plus $wif volume boost
- **Restraint** — how often the agent declines a signal for risk (discipline)
- **Blast radius** — worst-case capital at risk under the spend cap you set
- **Shadow mode** — observe-only period before live calls

And everything runs on **$wif** on Robinhood Chain.

---

## Core idea

**Discover → Compare rarity & restraint → Set $wif spend cap → Shadow → Activate → Flywheel**

1. Browse agents by category (Stock Tokens, Yield, Rebalancing, Health, Games, Onboarding).
2. Compare rarity, restraint, drawdown, and $wif volume they generate.
3. Set a **$wif spend cap**, allowlist, and expiry.
4. Optional shadow mode.
5. Hire. Fees and activity use $wif.
6. Usage increases $wif velocity and on-chain activity → agents that bring more $wif usage rise in rarity signals → more users come back.

---

## $wif integration & flywheel

| Mechanism | How it puts $wif to work |
|-----------|--------------------------|
| Hire fee | Paid in $wif |
| Spend cap | Denominated and enforced in $wif |
| Rarity boost | Agents with higher $wif volume / unique users rank higher |
| Stake-to-unlock | Stake $wif to access higher-rarity agents or lower fees |
| Activity trail | On-chain proof of $wif usage |

**Flywheel**: Using an agent → spends or locks $wif → increases agent rarity & visibility → attracts more users → more $wif activity. Users keep coming back because better agents and better rarity signals are tied to $wif usage.

---

## Categories

- Stock Tokens
- $wif Yield
- Rebalancing
- Health Factor
- Grid Trading
- Onboarding
- Games

---

## Contract skeleton

See `contracts/RariflatSession.sol`.

It defines:
- Session creation with spend cap, duration, and shadow mode flag
- `attemptSpend` that enforces the cap and shadow mode
- Revoke and remaining balance view

Ready to be deployed and wired on Robinhood Chain with the real $wif token.

---

## Status

Marketplace UI is complete for demo.
Wallet connect is simulated.
Contract is a clear skeleton.

Next for a full submission:
- Deploy `RariflatSession` on Robinhood Chain
- Wire real $wif allowance + transfer
- Connect real wallet (Privy or injected)
- Demo video + real transactions

---

## Hackathon alignment

- Builds on Robinhood Chain
- Puts $wif to work on-chain
- Has a clear flywheel
- Agents & AI + Tools category
- Existing work renovated with real $wif integration

---

**Rariflat**  
*Hire by rarity. Cap by $wif. Keep the ground level.*
