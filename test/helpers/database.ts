import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function cleanDatabase() {
  await prisma.transaction.deleteMany();

  await prisma.subscription.deleteMany();

  await prisma.wallet.deleteMany();

  await prisma.product.deleteMany();

  await prisma.user.deleteMany();
}

export async function connectDatabase() {
  await prisma.$connect();
}

export async function disconnectDatabase() {
  await prisma.$disconnect();
}

export { prisma };