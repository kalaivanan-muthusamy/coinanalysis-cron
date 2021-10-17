import { Controller, Post } from '@nestjs/common';
import { MarketsService } from './markets.service';

@Controller('markets')
export class MarketsController {
  constructor(private readonly marketsService: MarketsService) {}

  @Post('update')
  async updateMarketInfo() {
    return await this.marketsService.updateMarketInfo();
  }
}
