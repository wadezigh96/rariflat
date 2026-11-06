# Rariflat Demo Video Script (2–3 minutes)

## 0:00 – 0:15 Intro
"This is Rariflat — a rarity-ranked AI agent marketplace on Robinhood Chain. Instead of hiring agents with a blank check, you set a $wif spend cap, see restraint and blast radius, and every hire feeds a flywheel back into $wif."

## 0:15 – 0:40 Marketplace
- Show the grid
- Switch sort from Rarity → $wif Volume → Restraint
- Point out ranking badges updating
- Filter to Stock Tokens or $wif Yield

## 0:40 – 1:20 Hire flow
- Click a high-rarity agent
- Show rarity, restraint, $wif volume
- Change spend cap and watch blast radius update
- Toggle shadow mode
- Click Connect Wallet → choose Privy (or Injected)
- Click Hire with $wif
- Show the simulated session confirmation

## 1:20 – 1:50 Contract & flywheel
- Briefly show `contracts/RariflatSession.sol`
- Explain: createSession → attemptSpend / executeSpend enforces the $wif cap
- "Every real spend is an on-chain $wif transfer. Higher volume raises the agent’s rarity, which brings more users back. That’s the flywheel."

## 1:50 – 2:10 Close
"Rariflat puts $wif to work as the unit of trust and activity on Robinhood Chain. Hire by rarity. Cap by $wif. Keep the ground level."

## Tips
- Record the live `index.html` (or served version)
- Keep it under 3 minutes
- Show at least one real or simulated transaction path
- Mention the public repo and that existing work was renovated for this hackathon
