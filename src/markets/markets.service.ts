import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MarketInfoModal } from './markets.schema';
import { Spot } from '@binance/connector';
import { Cron } from '@nestjs/schedule';
import { QUOTE_ASSETS } from './../constants/index';

@Injectable()
export class MarketsService {
  private apiKey = '';
  private apiSecret = '';
  private client = new Spot(this.apiKey, this.apiSecret);
  constructor(
    @InjectModel('marketInfo') private marketInfoModal: Model<MarketInfoModal>
  ) {}

  @Cron('0 2 1 * * *')
  async updateMarketInfo() {
    const res = await this.client.exchangeInfo();
    let symbols = res?.data?.symbols;
    // Remove marketInfo
    await this.marketInfoModal.deleteMany({});
    symbols = symbols.filter((symbol) =>
      QUOTE_ASSETS.includes(symbol.quoteAsset)
    );
    const allSymbols = await this.marketInfoModal.insertMany(symbols);
    return allSymbols;
  }

  async getMarketInfo({ filter, select }: any) {
    return await this.marketInfoModal.find(filter).select(select);
  }
}
