import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CandlesService } from './candles.service';
import { CandlesController } from './candles.controller';
import { CandlesSchema } from './candles.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'candles', schema: CandlesSchema }])
  ],
  controllers: [CandlesController],
  providers: [CandlesService],
  exports: [CandlesService]
})
export class CandlesModule {}
