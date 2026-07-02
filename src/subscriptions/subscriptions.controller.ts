import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { SubscriptionsService } from './subscriptions.service';
import { BuyProductDto } from './dto/buy-product.dto';

@ApiTags('Subscriptions')
@ApiBearerAuth('bearer')
@UseGuards(JwtAuthGuard)
@Controller('subscriptions')
export class SubscriptionsController {
  constructor(
    private readonly subscriptionsService: SubscriptionsService,
  ) {}

  @Post('buy')
  purchase(
    @Req() req: any,
    @Body() dto: BuyProductDto,
  ) {
    return this.subscriptionsService.purchase(
      req.user.id,
      dto.productId,
    );
  }

  @Get('my')
  mySubscriptions(@Req() req: any) {
    return this.subscriptionsService.mySubscriptions(
      req.user.id,
    );
  }
}