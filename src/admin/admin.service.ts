import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async dashboard() {
    const users = await this.prisma.user.count();

    const products = await this.prisma.product.count();

    const activeProducts =
      await this.prisma.product.count({
        where: {
          active: true,
        },
      });

    const subscriptions =
      await this.prisma.subscription.count();

    const activeSubscriptions =
      await this.prisma.subscription.count({
        where: {
          status: 'ACTIVE',
        },
      });

    const transactions =
      await this.prisma.transaction.count();

    const revenue =
      await this.prisma.transaction.aggregate({
        where: {
          type: 'PURCHASE',
          status: 'COMPLETED',
        },
        _sum: {
          amount: true,
        },
      });

    const wallets =
      await this.prisma.wallet.aggregate({
        _sum: {
          balance: true,
        },
      });

    return {
      users,
      products,
      activeProducts,
      subscriptions,
      activeSubscriptions,
      transactions,

      revenue:
        revenue._sum.amount ?? 0,

      walletBalance:
        wallets._sum.balance ?? 0,
    };
  }
}