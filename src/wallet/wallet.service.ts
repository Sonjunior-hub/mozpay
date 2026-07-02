import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WalletService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string) {
    return this.prisma.wallet.create({
      data: {
        userId,
      },
    });
  }

  async findByUser(userId: string) {
    const wallet = await this.prisma.wallet.findUnique({
      where: {
        userId,
      },
    });

    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }

    return wallet;
  }

  async deposit(userId: string, amount: number) {
    const wallet = await this.findByUser(userId);

    return this.prisma.$transaction(async (tx) => {
      const updatedWallet = await tx.wallet.update({
        where: {
          id: wallet.id,
        },
        data: {
          balance: {
            increment: amount,
          },
        },
      });

      await tx.transaction.create({
        data: {
          walletId: wallet.id,
          amount,
          type: 'DEPOSIT',
          status: 'COMPLETED',
          reference: crypto.randomUUID(),
        },
      });

      return updatedWallet;
    });
  }

  async withdraw(userId: string, amount: number) {
    const wallet = await this.findByUser(userId);

    if (wallet.balance < amount) {
      throw new BadRequestException('Insufficient balance');
    }

    return this.prisma.$transaction(async (tx) => {
      const updatedWallet = await tx.wallet.update({
        where: {
          id: wallet.id,
        },
        data: {
          balance: {
            decrement: amount,
          },
        },
      });

      await tx.transaction.create({
        data: {
          walletId: wallet.id,
          amount,
          type: 'PURCHASE',
          status: 'COMPLETED',
          reference: crypto.randomUUID(),
        },
      });

      return updatedWallet;
    });
  }

  async updateBalance(
    walletId: string,
    amount: number,
  ) {
    return this.prisma.wallet.update({
      where: {
        id: walletId,
      },
      data: {
        balance: {
          decrement: amount,
        },
      },
    });
  }
}