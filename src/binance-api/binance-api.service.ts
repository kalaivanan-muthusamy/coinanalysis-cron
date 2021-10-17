import { Injectable } from '@nestjs/common';
import Binance from 'node-binance-api';

@Injectable()
export class BinanceApiService extends Binance {
  private binance = new Binance().options({
    APIKEY: '<key>',
    APISECRET: '<secret>'
  });
  constructor() {
    super();
  }

  get(): Binance {
    return this.binance;
  }
}
