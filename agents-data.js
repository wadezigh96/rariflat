const WIF_TOKEN = "0x5173b8ea6923c2d40267890d45c46a3480954773";
const CHAIN = "Robinhood Chain";

const AGENTS = [
  {name:"DriftGuard", cat:"Rebalancing", peerCount:3, uptimeDays:410, successRate:96, wifVolume:1240000, verified:true, h24n:38, h24p:22, h7n:210, h7p:150,
   keyLabel:"Rebalances / wk", keyValue:"12",
   desc:"Watches portfolio target weights and rebalances using $wif when drift crosses threshold. Spend cap enforced in $wif."},
  {name:"BalancerBee", cat:"Rebalancing", peerCount:9, uptimeDays:120, successRate:88, wifVolume:180000, verified:false, h24n:14, h24p:13, h7n:90, h7p:88,
   keyLabel:"Rebalances / wk", keyValue:"5",
   desc:"Lighter rebalancer for smaller $wif positions. Daily checks, fixed schedule."},
  {name:"WeightWatch", cat:"Rebalancing", peerCount:14, uptimeDays:35, successRate:79, wifVolume:22000, verified:false, h24n:9, h24p:4, h7n:40, h7p:19,
   keyLabel:"Rebalances / wk", keyValue:"3",
   desc:"Newer rebalancing agent still building track record. Nudges weights weekly."},
  {name:"AllocaFlow", cat:"Rebalancing", peerCount:6, uptimeDays:260, successRate:91, wifVolume:640000, verified:true, h24n:20, h24p:19, h7n:130, h7p:128,
   keyLabel:"Rebalances / wk", keyValue:"8",
   desc:"Multi-pool rebalancer that factors gas so it only trades when drift is worth it."},

  {name:"StockSentinel", cat:"Stock Tokens", peerCount:4, uptimeDays:280, successRate:94, wifVolume:890000, verified:true, h24n:31, h24p:28, h7n:190, h7p:170,
   keyLabel:"Stock Tokens managed", keyValue:"8",
   desc:"Monitors Robinhood Stock Tokens, rebalances or hedges using $wif. Rarity boosted by unique $wif users."},
  {name:"EquityGuard", cat:"Stock Tokens", peerCount:2, uptimeDays:190, successRate:93, wifVolume:520000, verified:true, h24n:18, h24p:17, h7n:110, h7p:105,
   keyLabel:"Stock Tokens managed", keyValue:"5",
   desc:"Conservative Stock Token allocator with tight risk bounds. Prefers liquid names."},
  {name:"TokenBasket", cat:"Stock Tokens", peerCount:11, uptimeDays:75, successRate:84, wifVolume:95000, verified:false, h24n:12, h24p:9, h7n:60, h7p:48,
   keyLabel:"Stock Tokens managed", keyValue:"12",
   desc:"Broader basket approach across more Stock Tokens. Higher turnover."},

  {name:"YieldCartographer", cat:"$wif Yield", peerCount:5, uptimeDays:300, successRate:92, wifVolume:1450000, verified:true, h24n:33, h24p:31, h7n:200, h7p:196,
   keyLabel:"Net APY (wif)", keyValue:"18.4%",
   desc:"Scans yield opportunities on Robinhood Chain and moves $wif to the best safe rates. Hire fee in $wif."},
  {name:"HarvestHand", cat:"$wif Yield", peerCount:10, uptimeDays:150, successRate:85, wifVolume:210000, verified:false, h24n:12, h24p:12, h7n:78, h7p:80,
   keyLabel:"Net APY (wif)", keyValue:"14.1%",
   desc:"Fixed-schedule harvester and compounder for yield positions that do not need active re-routing."},
  {name:"CompoundKeeper", cat:"$wif Yield", peerCount:1, uptimeDays:610, successRate:98, wifVolume:3400000, verified:true, h24n:19, h24p:18, h7n:120, h7p:118,
   keyLabel:"Net APY (wif)", keyValue:"22.7%",
   desc:"Longest-running yield agent. Rare strategy with the highest audited history."},
  {name:"PoolPathfinder", cat:"$wif Yield", peerCount:13, uptimeDays:28, successRate:77, wifVolume:15000, verified:false, h24n:11, h24p:3, h7n:38, h7p:12,
   keyLabel:"Net APY (wif)", keyValue:"9.8%",
   desc:"Explores newer, smaller pools for higher (higher-risk) $wif yields."},

  {name:"HealthSentinel", cat:"Health Factor", peerCount:4, uptimeDays:340, successRate:95, wifVolume:760000, verified:true, h24n:41, h24p:24, h7n:230, h7p:160,
   keyLabel:"Min HF maintained", keyValue:"1.62",
   desc:"Monitors lending positions collateralized with $wif and adds collateral or repays before liquidation."},
  {name:"LiquidationLookout", cat:"Health Factor", peerCount:8, uptimeDays:200, successRate:90, wifVolume:330000, verified:false, h24n:17, h24p:16, h7n:100, h7p:97,
   keyLabel:"Min HF maintained", keyValue:"1.35",
   desc:"Leaner health-factor buffer. Slightly higher risk for lower idle collateral."},
  {name:"MarginMinder", cat:"Health Factor", peerCount:2, uptimeDays:480, successRate:97, wifVolume:1900000, verified:true, h24n:25, h24p:23, h7n:150, h7p:145,
   keyLabel:"Min HF maintained", keyValue:"1.78",
   desc:"Widest safety buffer. Aimed at large $wif positions where liquidation risk matters most."},
  {name:"CushionBot", cat:"Health Factor", peerCount:16, uptimeDays:15, successRate:72, wifVolume:6000, verified:false, h24n:6, h24p:1, h7n:24, h7p:7,
   keyLabel:"Min HF maintained", keyValue:"1.11",
   desc:"New thin-margin agent. Early track record — watch before large positions."},

  {name:"GridForge", cat:"Grid Trading", peerCount:4, uptimeDays:380, successRate:94, wifVolume:980000, verified:true, h24n:44, h24p:25, h7n:260, h7p:180,
   keyLabel:"Max drawdown", keyValue:"-4.2%",
   desc:"Places buy/sell grids around $wif pairs. Captures range moves without directional bet."},
  {name:"BoxRunner", cat:"Grid Trading", peerCount:11, uptimeDays:90, successRate:83, wifVolume:95000, verified:false, h24n:16, h24p:15, h7n:80, h7p:79,
   keyLabel:"Max drawdown", keyValue:"-9.1%",
   desc:"Wider-spaced grid for volatile $wif pairs. Fewer, larger steps."},
  {name:"LatticeBot", cat:"Grid Trading", peerCount:2, uptimeDays:520, successRate:97, wifVolume:2100000, verified:true, h24n:29, h24p:27, h7n:190, h7p:186,
   keyLabel:"Max drawdown", keyValue:"-2.8%",
   desc:"Longest-running grid trader. Tight, actively-rebalanced grid tuned per pair."},
  {name:"StepTrader", cat:"Grid Trading", peerCount:17, uptimeDays:20, successRate:74, wifVolume:9000, verified:false, h24n:5, h24p:1, h7n:22, h7p:6,
   keyLabel:"Max drawdown", keyValue:"-14.5%",
   desc:"Early-stage grid. Still tuning step size and range — higher variance."},

  {name:"OnboardFlow", cat:"Onboarding", peerCount:2, uptimeDays:90, successRate:89, wifVolume:420000, verified:true, h24n:52, h24p:48, h7n:310, h7p:280,
   keyLabel:"New users / wk", keyValue:"28",
   desc:"Simplifies first $wif interaction. Guides new users into safe agent hires and basic Stock Token exposure."},
  {name:"FirstStep", cat:"Onboarding", peerCount:5, uptimeDays:45, successRate:86, wifVolume:180000, verified:false, h24n:28, h24p:25, h7n:160, h7p:145,
   keyLabel:"New users / wk", keyValue:"15",
   desc:"Ultra-simple onboarding path. Focuses on one safe first action with $wif."},

  {name:"FlatGameBot", cat:"Games", peerCount:7, uptimeDays:150, successRate:81, wifVolume:310000, verified:false, h24n:22, h24p:15, h7n:140, h7p:95,
   keyLabel:"Active players", keyValue:"140",
   desc:"Runs short $wif-based competitions and last-buyer style mini-games. Pot and entries in $wif."},
  {name:"ClockPot", cat:"Games", peerCount:3, uptimeDays:210, successRate:88, wifVolume:670000, verified:true, h24n:35, h24p:28, h7n:200, h7p:165,
   keyLabel:"Active players", keyValue:"210",
   desc:"Countdown pot game. Every qualifying $wif buy extends the clock. Last buyer takes the pot."}
].map(a => ({...a, dataSource:"curated-demo", chain:CHAIN, token:WIF_TOKEN}));

const CATEGORIES = ["All", "Stock Tokens", "$wif Yield", "Rebalancing", "Health Factor", "Grid Trading", "Onboarding", "Games"];

const ALLOWLIST_OPTIONS = {
  "Rebalancing": ["swap", "rebalance"],
  "Stock Tokens": ["swap", "rebalance", "hedge"],
  "$wif Yield": ["deposit", "withdraw", "claim"],
  "Health Factor": ["repay", "add_collateral"],
  "Grid Trading": ["place_order", "cancel_order"],
  "Onboarding": ["swap", "approve"],
  "Games": ["enter", "claim"]
};
