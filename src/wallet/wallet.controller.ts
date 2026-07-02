import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { WalletService } from './wallet.service';

import { DepositDto } from './dto/deposit.dto';

import { WithdrawDto } from './dto/withdraw.dto';

@ApiTags('Wallet')
@ApiBearerAuth('bearer')
@UseGuards(JwtAuthGuard)
@Controller('wallet')
export class WalletController {
  constructor(
    private readonly walletService: WalletService,
  ) {}

  @Get()
  getWallet(@Req() req: any) {
    return this.walletService.findByUser(req.user.id);
  }

  @Post('deposit')
  deposit(
    @Req() req: any,
    @Body() dto: DepositDto,
  ) {
    return this.walletService.deposit(
      req.user.id,
      dto.amount,
    );
  }

  @Post('withdraw')
    withdraw(
    @Req() req: any,
    @Body() dto: WithdrawDto,
  ) {
    return this.walletService.withdraw(
        req.user.id,
        dto.amount,
    );
  }
}