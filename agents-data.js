const WIF_TOKEN = "0x5173b8ea6923c2d40267890d45c46a3480954773";
const CHAIN = "Robinhood Chain";

const AGENTS = [
  {name:"DriftGuard", cat:"Rebalancing", peerCount:3, uptimeDays:410, successRate:96, wifVolume:1240000, verified:true, h24n:38, h24p:22, h7n:210, h7p:150, hist7:[18,20,24,27,30,34,38],
   keyLabel:"Rebalances / wk", keyValue:"12",
   desc:"Watches portfolio target weights and rebalances using $wif when drift crosses threshold. Spend cap enforced in $wif."},
  {name:"BalancerBee", cat:"Rebalancing", peerCount:9, uptimeDays:120, successRate:88, wifVolume:180000, verified:false, h24n:14, h24p:13, h7n:90, h7p:88, hist7:[12,13,12,14,13,14,14],
   keyLabel:"Rebalances / wk", keyValue:"5",
   desc:"Lighter rebalancer for smaller $wif positions. Daily checks, fixed schedule."},
  {name:"StockSentinel", cat:"Stock Tokens", peerCount:4, uptimeDays:280, successRate:94, wifVolume:890000, verified:true, h24n:31, h24p:28, h7n:190, h7p:170, hist7:[22,24,26,27,29,30,31],
   keyLabel:"Stock Tokens managed", keyValue:"8",
   desc:"Monitors Robinhood Stock Tokens, rebalances or hedges using $wif. Rarity boosted by unique $wif users."},
  {name:"YieldCartographer", cat:"$wif Yield", peerCount:5, uptimeDays:300, successRate:92, wifVolume:1450000, verified:true, h24n:33, h24p:31, h7n:200, h7p:196, hist7:[28,29,29,30,31,32,33],
   keyLabel:"Net APY (wif)", keyValue:"18.4%",
   desc:"Scans yield opportunities on Robinhood Chain and moves $wif to the best safe rates. Hire fee in $wif."},
  {name:"HealthSentinel", cat:"Health Factor", peerCount:4, uptimeDays:340, successRate:95, wifVolume:760000, verified:true, h24n:41, h24p:24, h7n:230, h7p:160, hist7:[19,23,27,31,35,38,41],
   keyLabel:"Min HF maintained", keyValue:"1.62",
   desc:"Monitors lending positions collateralized with $wif and adds collateral or repays before liquidation."},
  {name:"GridForge", cat:"Grid Trading", peerCount:4, uptimeDays:380, successRate:94, wifVolume:980000, verified:true, h24n:44, h24p:25, h7n:260, h7p:180, hist7:[20,24,29,33,36,40,44],
   keyLabel:"Max drawdown", keyValue:"-4.2%",
   desc:"Places buy/sell grids around $wif pairs. Captures range moves without directional bet."},
  {name:"OnboardFlow", cat:"Onboarding", peerCount:2, uptimeDays:90, successRate:89, wifVolume:420000, verified:true, h24n:52, h24p:48, h7n:310, h7p:280, hist7:[35,40,44,46,49,51,52],
   keyLabel:"New users / wk", keyValue:"28",
   desc:"Simplifies first $wif interaction. Guides new users into safe agent hires and basic Stock Token exposure."},
  {name:"FlatGameBot", cat:"Games", peerCount:7, uptimeDays:150, successRate:81, wifVolume:310000, verified:false, h24n:22, h24p:15, h7n:140, h7p:95, hist7:[12,14,16,18,19,21,22],
   keyLabel:"Active players", keyValue:"140",
   desc:"Runs short $wif-based competitions and last-buyer style mini-games. Pot and entries in $wif."}
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
