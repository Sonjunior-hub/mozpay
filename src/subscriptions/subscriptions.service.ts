import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { ProductsService } from '../products/products.service';
import { WalletService } from '../wallet/wallet.service';
import { PrismaService } from '../prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class SubscriptionsService {
  constructor(
    private readonly productsService: ProductsService,
    private readonly walletService: WalletService,
    private readonly prisma: PrismaService,
  ) {}

  async purchase(userId: string, productId: string) {
    const product = await this.productsService.findActiveById(productId);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const existingSubscription =
    await this.prisma.subscription.findFirst({
        where: {
        userId,
        productId,
        status: 'ACTIVE',
        },
    });

    if (existingSubscription) {
    throw new BadRequestException(
        'You already have an active subscription for this product',
    );
    }

    const wallet = await this.walletService.findByUser(userId);

    if (wallet.balance < product.price) {
    throw new BadRequestException(
        'Insufficient balance',
    );
    }

    return this.prisma.$transaction(async (tx) => {
        const updatedWallet = await tx.wallet.update({
          where: {
            id: wallet.id,
          },
          data: {
            balance: {
              decrement: product.price,
            },
          },
        });

        await tx.transaction.create({
        data: {
            walletId: wallet.id,
            amount: product.price,
            type: 'PURCHASE',
            status: 'COMPLETED',
            reference: crypto.randomUUID(),
        },
        });

        const subscription = await tx.subscription.create({
        data: {
            userId,
            productId: product.id,
            status: 'ACTIVE',

            startDate: new Date(),

            endDate: new Date(
            Date.now() + product.duration * 24 * 60 * 60 * 1000,
            ),
        },
        });

        return {
        message: 'Subscription purchased successfully',

        wallet: updatedWallet,

        subscription,
        };
    });
    
  }

  async mySubscriptions(userId: string) {
    return this.prisma.subscription.findMany({
        where: {
        userId,
        },
        include: {
        product: true,
        },
        orderBy: {
        createdAt: 'desc',
        },
    });
  }
}