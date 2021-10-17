import { Schema, Document, Types } from 'mongoose';

export const PreferredMarketSchema = new Schema(
  {
    symbol: {
      type: String,
      required: true
    },
    isPreferred: {
      type: Boolean,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export interface PreferredMarketModal extends Document {
  _id: Types.ObjectId;
  symbol: string;
  isPreferred: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
