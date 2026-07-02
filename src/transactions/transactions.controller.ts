import { Controller, Get, Req, UseGuards,} from '@nestjs/common';

import { ApiBearerAuth, ApiTags,} from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { TransactionsService } from './transactions.service';
import { Query } from '@nestjs/common';
import { TransactionFilterDto } from './dto/transaction-filter.dto';

@ApiTags('Transactions')
@ApiBearerAuth('bearer')
@UseGuards(JwtAuthGuard)
@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
  ) {}

  @Get('my')
  myTransactions(
    @Req() req: any,
    @Query() query: TransactionFilterDto,
  ) {
    return this.transactionsService.myTransactions(
      req.user.id,
      query,
    );
  }
}