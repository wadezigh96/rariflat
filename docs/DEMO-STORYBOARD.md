# Rariflat Demo Video — Detailed Storyboard (2:30–3:00)

## Scene 1 — Hook (0:00–0:12)
**Visual:** Dark marketplace grid with green accents. Cursor slowly moves across cards.
**Voiceover:**
"Most agent marketplaces let you hire with a blank check. Rariflat does the opposite. You set a $wif spend cap, see restraint and blast radius first, and every hire feeds a flywheel back into $wif on Robinhood Chain."

## Scene 2 — Marketplace overview (0:12–0:35)
**Visual:**
- Full grid visible
- Click sort “Rarity” → ranking badges reorder
- Click “$wif Volume” → order changes again
- Click “Restraint”
- Filter to “Stock Tokens” then “$wif Yield”

**Voiceover:**
"Agents are ranked by rarity, $wif volume, and restraint — how often they decline a signal for risk. You can filter by category, including Stock Tokens and pure $wif yield strategies."

## Scene 3 — Open agent detail (0:35–1:05)
**Visual:**
- Click a high-rarity verified agent (e.g. CompoundKeeper or LatticeBot)
- Modal opens with animation
- Point at rarity, restraint, $wif volume
- Change spend cap from 100 → 250 → blast radius updates live
- Toggle shadow mode

**Voiceover:**
"Before you hire, you see the full picture. Rarity score, restraint, and exact $wif volume. Set your spend cap in $wif — the blast radius shows the maximum capital at risk. Shadow mode lets the agent observe only for the first days."

## Scene 4 — Wallet + Hire (1:05–1:40)
**Visual:**
- Click Connect Wallet → choose Injected (or show simulated if recording without wallet)
- Address appears in header
- Click “Hire with $wif”
- Status text appears: Approving → Creating session
- Show success message with session id / tx hash (or simulated confirmation)

**Voiceover:**
"Connect your wallet on Robinhood Chain. Approve the session contract for the $wif amount, then create the session. The contract enforces the cap and the time window. No blank check."

## Scene 5 — Contract proof (1:40–2:05)
**Visual:**
- Quick cut to `contracts/RariflatSession.sol` (or Blockscout if already deployed)
- Highlight `createSession`, `executeSpend`, and the spendCap check
- Optional: show a real transaction on the explorer

**Voiceover:**
"On-chain, RariflatSession records the session. The agent can only move $wif up to the cap you set. Every successful spend is a real $wif transfer that can later boost the agent’s rarity score."

## Scene 6 — Flywheel close (2:05–2:25)
**Visual:**
- Back to marketplace
- Highlight the flywheel box at the bottom
- End on the logo + $wif address

**Voiceover:**
"That’s the flywheel. Hire with $wif, generate on-chain activity, raise rarity, attract more users, repeat. Rariflat puts $wif to work as the unit of trust on Robinhood Chain. Hire by rarity. Cap by $wif. Keep the ground level."

## Recording tips
- Record at 1920×1080
- Use the live `index.html` (serve it)
- Keep mouse movements deliberate
- If you have a deployed contract, show one real tx; otherwise use the simulated path and mention it
- Total target: 2:30–3:00
- End with repo URL on screen: github.com/wadezigh96/rariflat
