import { Schema, Document, Types } from 'mongoose';

export const FiltersSchema = new Schema({
  filterType: String,
  minPrice: Number,
  maxPrice: Number,
  tickerSize: Number,
  multiplierUp: Number,
  multiplierDown: Number,
  avgPriceMins: Number,
  minQty: Number,
  maxQty: Number,
  stepSize: Number,
  minNotional: Number,
  applyToMarket: Boolean,
  limit: Number,
  maxNumOrders: Number,
  maxNumAlgoOrders: Number
});

export const MarketInfoSchema = new Schema(
  {
    symbol: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    baseAsset: {
      type: String,
      required: true
    },
    baseAssetPrecision: {
      type: Number,
      required: true
    },
    quoteAsset: {
      type: String,
      required: true
    },
    quotePrecision: {
      type: Number,
      required: true
    },
    quoteAssetPrecision: {
      type: Number,
      required: true
    },
    baseCommissionPrecision: {
      type: Number,
      required: true
    },
    quoteCommissionPrecision: {
      type: Number,
      required: true
    },
    orderTypes: {
      type: [String],
      required: true
    },
    icebergAllowed: {
      type: Boolean,
      required: true
    },
    ocoAllowed: {
      type: Boolean,
      required: true
    },
    quoteOrderQtyMarketAllowed: {
      type: Boolean,
      required: true
    },
    isSpotTradingAllowed: {
      type: Boolean,
      required: true
    },
    isMarginTradingAllowed: {
      type: Boolean,
      required: true
    },
    filters: {
      type: [FiltersSchema]
    },
    permissions: [String]
  },
  {
    timestamps: true
  }
);

export interface IFilters {
  filterType: string;
  minPrice: number;
  maxPrice: number;
  tickerSize: number;
  multiplierUp: number;
  multiplierDown: number;
  avgPriceMins: number;
  minQty: number;
  maxQty: number;
  stepSize: number;
  minNotional: number;
  applyToMarket: boolean;
  limit: number;
  maxNumOrders: number;
  maxNumAlgoOrders: number;
}

export interface MarketInfoModal extends Document {
  _id: Types.ObjectId;
  symbol: string;
  status: string;
  baseAsset: string;
  baseAssetPrecision: number;
  quoteAsset: string;
  quotePrecision: number;
  quoteAssetPrecision: number;
  baseCommissionPrecision: number;
  quoteCommissionPrecision: number;
  orderTypes: [string];
  icebergAllowed: boolean;
  ocoAllowed: boolean;
  quoteOrderQtyMarketAllowed: boolean;
  isSpotTradingAllowed: boolean;
  isMarginTradingAllowed: boolean;
  filters: [IFilters];
  permissions: [string];
  createdAt?: Date;
  updatedAt?: Date;
}
