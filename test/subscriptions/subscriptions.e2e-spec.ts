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

describe('Subscriptions E2E', () => {
  let app;

  let userToken: string;
  let adminToken: string;

  let product: any;

  beforeAll(async () => {
    await setupTestDatabase();

    app = await createTestingApp();

    const admin = await registerAndLoginAdmin(app);
    adminToken = admin.token;

    const user = await registerAndLogin(app);
    userToken = user.token;

    const createdProduct = await request(app.getHttpServer())
      .post('/products')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Netflix Premium',
        provider: 'Netflix',
        description: 'Plano Premium',
        price: 399,
        duration: 30,
      })
      .expect(201);

    product = createdProduct.body;

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

  it('should purchase subscription', async () => {
    const response = await request(app.getHttpServer())
      .post('/subscriptions/buy')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        productId: product.id,
      })
      .expect(201);

    expect(response.body.message).toContain('Subscription');
  });

  it('should reject duplicate subscription', async () => {
    await request(app.getHttpServer())
        .post('/subscriptions/buy')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
        productId: product.id,
        })
        .expect(400);
    });

  it('should decrease wallet balance after purchase', async () => {
    const response = await request(app.getHttpServer())
        .get('/wallet')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

    expect(response.body.balance).toBe(601);
    });

  it('should list user subscriptions', async () => {
    const response = await request(app.getHttpServer())
        .get('/subscriptions/my')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

    expect(response.body.length).toBe(1);

    expect(response.body[0].status).toBe('ACTIVE');

    expect(response.body[0].product.name).toBe('Netflix Premium');
    });

  it('should create purchase transaction', async () => {
    const response = await request(app.getHttpServer())
        .get('/transactions/my')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

    const purchase = response.body.data.find(
        (t: any) => t.type === 'PURCHASE',
    );

    expect(purchase).toBeDefined();
    expect(purchase.amount).toBe(399);
    expect(purchase.status).toBe('COMPLETED');

    expect(response.body.pagination.total).toBe(2);
    expect(response.body.pagination.page).toBe(1);
    });
});