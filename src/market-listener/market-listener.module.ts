import { Module } from '@nestjs/common';
import { MarketListenerService } from './market-listener.service';
import { MarketListenerController } from './market-listener.controller';
import { CandlesModule } from './../candles/candles.module';
import { MarketsModule } from './../markets/markets.module';
import { BinanceApiService } from './../binance-api/binance-api.service';

@Module({
  imports: [CandlesModule, MarketsModule],
  controllers: [MarketListenerController],
  providers: [MarketListenerService, BinanceApiService]
})
export class MarketListenerModule {}
