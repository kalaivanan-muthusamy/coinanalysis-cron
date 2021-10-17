import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MarketsService } from './markets.service';
import { MarketsController } from './markets.controller';
import { MarketInfoSchema } from './markets.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'marketInfo', schema: MarketInfoSchema }
    ])
  ],
  controllers: [MarketsController],
  providers: [MarketsService],
  exports: [MarketsService]
})
export class MarketsModule {}
