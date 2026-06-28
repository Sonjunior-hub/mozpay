import { Injectable } from '@nestjs/common';
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
}