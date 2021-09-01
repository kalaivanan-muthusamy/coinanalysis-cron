import { ALL_MARKETS } from './all-markets';

export const PREFERRED_MARKET_LIST = [
  'B-1INCH_USDT',
  'B-AAVE_USDT',
  'B-ADA_USDT',
  'B-ATOM_USDT',
  'B-BAND_USDT',
  'B-BCH_USDT',
  'B-BNB_USDT',
  'B-BTC_USDT',
  'B-CHZ_USDT',
  'B-CKB_USDT',
  'B-COMP_USDT',
  'B-DASH_USDT',
  'B-DOGE_USDT',
  'B-DOT_USDT',
  'B-ENJ_USDT',
  'B-EOS_USDT',
  'B-ETH_USDT',
  'B-FTM_USDT',
  'B-ICP_USDT',
  'B-IOTA_USDT',
  'B-LINK_USDT',
  'B-LTC_USDT',
  'B-MATIC_USDT',
  'B-ONE_USDT',
  'B-ONG_USDT',
  'B-SUSHI_USDT',
  'B-SXP_USDT',
  'B-TFUEL_USDT',
  'B-THETA_USDT',
  'B-TRX_USDT',
  'B-UNI_USDT',
  'B-VET_USDT',
  'B-XLM_USDT',
  'B-XRP_USDT'
];

export const PREFERRED_MARKETS = ALL_MARKETS.filter((market) =>
  PREFERRED_MARKET_LIST.includes(market.pair)
);
