import { Controller, Post } from '@nestjs/common';
import { MarketListenerService } from './market-listener.service';

@Controller('market-listener')
export class MarketListenerController {
  constructor(private readonly marketListenerService: MarketListenerService) {}

  @Post('load-initial')
  async loadInitital() {
    return await this.marketListenerService.storeCandlestickData({});
  }
}
