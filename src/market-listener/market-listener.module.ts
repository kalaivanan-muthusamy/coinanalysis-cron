import { Module } from '@nestjs/common';
import { MarketListenerService } from './market-listener.service';
import { MarketListenerController } from './market-listener.controller';
import { CandlesModule } from './../candles/candles.module';

@Module({
  imports: [CandlesModule],
  controllers: [MarketListenerController],
  providers: [MarketListenerService]
})
export class MarketListenerModule {}
