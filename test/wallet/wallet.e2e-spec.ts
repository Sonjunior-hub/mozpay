import request from 'supertest';

import {
  createTestingApp,
  closeTestingApp,
} from '../helpers/app';

import {
  setupTestDatabase,
  teardownTestDatabase,
} from '../helpers/test-database';

import { registerAndLogin } from '../helpers/auth';

describe('Wallet E2E', () => {
  let app;
  let token: string;

  beforeAll(async () => {
    await setupTestDatabase();

    app = await createTestingApp();

    const auth = await registerAndLogin(app);

    token = auth.token;
  });

  afterAll(async () => {
    await closeTestingApp();
    await teardownTestDatabase();
  });

  it('should return wallet', async () => {
    const response = await request(app.getHttpServer())
      .get('/wallet')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body).toHaveProperty('balance');

    expect(response.body).toHaveProperty('currency');
  });

  it('should deposit money', async () => {
    const response = await request(app.getHttpServer())
      .post('/wallet/deposit')
      .set('Authorization', `Bearer ${token}`)
      .send({
        amount: 500,
      })
      .expect(201);

    expect(response.body.balance).toBeGreaterThanOrEqual(500);
  });

  it('should reject negative deposit', async () => {
    await request(app.getHttpServer())
      .post('/wallet/deposit')
      .set('Authorization', `Bearer ${token}`)
      .send({
        amount: -100,
      })
      .expect(400);
  });

  it('should reject request without token', async () => {
    await request(app.getHttpServer())
      .get('/wallet')
      .expect(401);
  });
});