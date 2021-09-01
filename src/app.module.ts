import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { MarketListenerModule } from './market-listener/market-listener.module';
import { CandlesModule } from './candles/candles.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_URI),
    MarketListenerModule,
    CandlesModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
