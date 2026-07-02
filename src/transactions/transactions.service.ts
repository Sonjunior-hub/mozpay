import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TransactionFilterDto } from './dto/transaction-filter.dto';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async myTransactions(
  userId: string,
  query: TransactionFilterDto,
) {
  const {
    page = 1,
    limit = 10,
    type,
    status,
    from,
    to,
  } = query;

  const skip = (page - 1) * limit;

  const where: any = {
    wallet: {
      userId,
    },
  };

  if (type) {
    where.type = type;
  }

  if (status) {
    where.status = status;
  }

  if (from || to) {
    where.createdAt = {};

    if (from) {
      where.createdAt.gte = new Date(from);
    }

    if (to) {
      where.createdAt.lte = new Date(to);
    }
  }

  const [transactions, total] =
    await this.prisma.$transaction([
      this.prisma.transaction.findMany({
        where,
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      }),

      this.prisma.transaction.count({
        where,
      }),
    ]);

    return {
      data: transactions,

      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }
}