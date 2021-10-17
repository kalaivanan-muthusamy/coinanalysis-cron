import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CandlesService } from './../candles/candles.service';
import { chunkArray } from './../utils/array';
import { BinanceApiService } from './../binance-api/binance-api.service';
import { MarketsService } from './../markets/markets.service';

@Injectable()
export class MarketListenerService {
  constructor(
    private candlesService: CandlesService,
    private binanceService: BinanceApiService,
    private marketsService: MarketsService
  ) {}

  // Listen to the market data and store the candles in database for further analysis
  // @Cron("30 2,5,8,11,14,17,20,23,26,29,32,35,38,41,44,47,50,43,56,59 * * * *")
  @Cron('30 14,29,44,59 * * * *')
  async listenMarketData() {
    console.info(new Date(), 'Listening market data');
    const interval = '3m';
    const allMarkets = await this.marketsService.getMarketInfo({
      select: 'symbol'
    });

    const chunks = chunkArray(allMarkets, 10);
    const failedMarkets = [];
    let candles = [];

    for (let i = 0; i < chunks.length; i++) {
      const markets = chunks[i];
      const promises = markets.map(async (market) => {
        try {
          // console.log('Making API Call for ', market.symbol);
          const ohlc = await this.binanceService.candlesticks(
            market.symbol,
            interval,
            null,
            { limit: 1 }
          );
          const newCandles = ohlc.map((d) => ({
            pair: market.symbol,
            interval,
            open: d[1],
            high: d[2],
            low: d[3],
            close: d[4],
            volume: d[5],
            dateTime: new Date(d[0])
          }));
          candles = [...candles, ...newCandles];
          // console.log('Completed API Call for ', market.symbol);
        } catch (err) {
          console.error('Error on ', market.symbol, err);
          failedMarkets.push(market.symbol);
        }
      });
      await Promise.all(promises);
    }
    await this.candlesService.addCandles(candles);
    console.info(new Date(), 'Completed storing market data', failedMarkets);
    return { status: 'success', failedMarkets };
  }

  async storeCandlestickData({ interval = '15m', limit = 1000 }) {
    console.info(new Date(), 'Started fetching candlestick data');

    const allMarkets = await this.marketsService.getMarketInfo({
      select: 'symbol'
    });

    const chunks = chunkArray(allMarkets, 10);
    const failedMarkets = [];
    for (let i = 0; i < chunks.length; i++) {
      const markets = chunks[i];
      let candles = [];
      const promises = markets.map(async (market) => {
        try {
          // console.log('Making API Call for ', market.symbol);
          const ohlc = await this.binanceService.candlesticks(
            market.symbol,
            interval,
            null,
            { limit }
          );
          const newCandles = ohlc.map((d) => ({
            pair: market.symbol,
            interval,
            open: d[1],
            high: d[2],
            low: d[3],
            close: d[4],
            volume: d[5],
            dateTime: new Date(d[0])
          }));
          candles = [...candles, ...newCandles];
          // console.log('Completed API Call for ', market.symbol);
        } catch (err) {
          console.error('Error on ', market.symbol, err);
          failedMarkets.push(market.symbol);
        }
      });
      await Promise.all(promises);
      await this.candlesService.addCandles(candles);
      console.log({ completed: i });
    }

    console.info(new Date(), 'Completed storing market data', failedMarkets);
    return { status: 'success', failedMarkets };
  }
}
