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
  registerAndLoginAdmin,
} from '../helpers/auth';

describe('Admin E2E', () => {
  let app;

  let adminToken: string;
  let userToken: string;

  beforeAll(async () => {
    await setupTestDatabase();

    app = await createTestingApp();

    const admin = await registerAndLoginAdmin(app);
    adminToken = admin.token;

    const user = await registerAndLogin(app);
    userToken = user.token;
  });

  afterAll(async () => {
    await closeTestingApp();
    await teardownTestDatabase();
  });

  it('should allow ADMIN to access dashboard', async () => {
    const response = await request(app.getHttpServer())
      .get('/admin/dashboard')
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);

    expect(response.body).toHaveProperty('users');
    expect(response.body).toHaveProperty('products');
    expect(response.body).toHaveProperty('subscriptions');
    expect(response.body).toHaveProperty('transactions');
  });

  it('should reject USER accessing dashboard', async () => {
    await request(app.getHttpServer())
      .get('/admin/dashboard')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(403);
  });
});