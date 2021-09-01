import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CandlesModel } from './candles.schema';

@Injectable()
export class CandlesService {
  constructor(
    @InjectModel('candles')
    private candlesModel: Model<CandlesModel>
  ) {}

  async addCandles(data) {
    const newCandles = Array.isArray(data) ? data : [data];
    await this.candlesModel.insertMany(newCandles);
  }
}
