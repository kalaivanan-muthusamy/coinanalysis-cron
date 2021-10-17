import { Schema, Document, Types } from 'mongoose';

export const CandlesSchema = new Schema(
  {
    pair: {
      type: String,
      required: true
    },
    interval: {
      type: String,
      required: true
    },
    open: {
      type: Number,
      required: true
    },
    high: {
      type: Number,
      required: true
    },
    low: {
      type: Number,
      required: true
    },
    close: {
      type: Number,
      required: true
    },
    volume: {
      type: Number,
      required: true
    },
    dateTime: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true
  }
);
// CandlesSchema.index({ pair: 1, dateTime: 1 }, { unique: true });

export interface CandlesModel extends Document {
  _id: Types.ObjectId;
  pair: string;
  interval: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  dateTime: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
