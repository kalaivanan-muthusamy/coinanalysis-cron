import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { MarketListenerModule } from './market-listener/market-listener.module';
import { CandlesModule } from './candles/candles.module';
import { MarketsModule } from './markets/markets.module';
import { BinanceApiService } from './binance-api/binance-api.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_URI),
    MarketListenerModule,
    CandlesModule,
    MarketsModule
  ],
  controllers: [],
  providers: [BinanceApiService]
})
export class AppModule {}
