import request from 'supertest';

import {
  createTestingApp,
  closeTestingApp,
} from '../helpers/app';

import {
  setupTestDatabase,
  teardownTestDatabase,
} from '../helpers/test-database';

import {
  registerAndLogin,
} from '../helpers/auth';

describe('Transactions E2E', () => {
  let app;
  let userToken: string;

  beforeAll(async () => {
    await setupTestDatabase();

    app = await createTestingApp();

    const user = await registerAndLogin(app);
    userToken = user.token;

    await request(app.getHttpServer())
      .post('/wallet/deposit')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        amount: 1000,
      })
      .expect(201);
  });

  afterAll(async () => {
    await closeTestingApp();
    await teardownTestDatabase();
  });

  it('should list transactions', async () => {
    const response = await request(app.getHttpServer())
      .get('/transactions/my')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200);

    expect(Array.isArray(response.body.data)).toBe(true);

    expect(response.body.pagination.total).toBeGreaterThan(0);
  });
});