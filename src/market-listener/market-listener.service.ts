import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { coinDcxServiceCall } from 'src/utils/service-call';
import { PREFERRED_MARKETS } from './../constants/preferred-markets';
import { CandlesService } from './../candles/candles.service';
import { chunkArray } from './../utils/array';

@Injectable()
export class MarketListenerService {
  constructor(private candlesService: CandlesService) {}

  // Listen to the market data store the candles in database for further analysis
  @Cron('15 */5 * * * *')
  listenMarketData() {
    console.info(new Date(), 'Listening market data');
    const preferredMarketChunks = chunkArray(PREFERRED_MARKETS, 8);

    preferredMarketChunks.map(async (arrayChunk) => {
      const promises = arrayChunk.map(async (market) => {
        // Get candle details
        const { data } = await coinDcxServiceCall(
          'GET',
          'market_data/candles',
          {
            pair: market?.pair,
            interval: '1m',
            limit: 2
          }
        );
        const candle = data[1];

        this.candlesService.addCandles({
          pair: market?.pair,
          open: candle?.open,
          high: candle?.high,
          low: candle?.low,
          close: candle?.close,
          volume: candle?.volume,
          interval: '1m',
          dateTime: new Date(candle.time)
        });
        return;
      });
      await Promise.all(promises);
    });
  }

  async loadInitialData() {
    const preferredMarketChunks = chunkArray(PREFERRED_MARKETS, 8);
    const promises = preferredMarketChunks.map(async (arrayChunk) => {
      const promises = arrayChunk.map(async (market) => {
        try {
          const { data } = await coinDcxServiceCall(
            'GET',
            'market_data/candles',
            {
              pair: market?.pair,
              interval: '5m',
              limit: 1000
            }
          );

          const newCandles = data.map((d) => ({
            ...d,
            pair: market?.pair,
            interval: '5m',
            dateTime: new Date(d.time)
          }));

          await this.candlesService.addCandles(newCandles);
        } catch (err) {
          console.error(err);
        }
      });
      await Promise.all(promises);
    });
    await Promise.all(promises);
    return 'Initial data loaded';
  }
}
