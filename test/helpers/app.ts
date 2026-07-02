import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from '../../src/app.module';

let app: INestApplication;

export async function createTestingApp() {

  const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

  const app = moduleFixture.createNestApplication();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.init();

  return app;
}

export async function closeTestingApp() {
  if (app) {
    await app.close();
    app = undefined;
  }
}