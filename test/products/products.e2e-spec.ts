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

describe('Products E2E', () => {
  let app;
  let adminToken: string;
  let product: any;

  beforeAll(async () => {
    await setupTestDatabase();

    app = await createTestingApp();

    const admin = await registerAndLoginAdmin(app);
    adminToken = admin.token;

    const response = await request(app.getHttpServer())
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

    product = response.body;
  });

  afterAll(async () => {
    await closeTestingApp();
    await teardownTestDatabase();
  });

  it('should create product', async () => {
    expect(product).toBeDefined();
    expect(product.id).toBeDefined();
    expect(product.name).toBe('Netflix Premium');
    expect(product.provider).toBe('Netflix');
    expect(product.price).toBe(399);
    expect(product.active).toBe(true);
  });

  it('should reject USER creating product', async () => {
    const user = await registerAndLogin(app);

    await request(app.getHttpServer())
      .post('/products')
      .set('Authorization', `Bearer ${user.token}`)
      .send({
        name: 'Spotify Premium',
        provider: 'Spotify',
        description: 'Plano Premium',
        price: 250,
        duration: 30,
      })
      .expect(403);
  });

  it('should list products', async () => {
    const response = await request(app.getHttpServer())
      .get('/products')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should get product by id', async () => {
    const response = await request(app.getHttpServer())
      .get(`/products/${product.id}`)
      .expect(200);

    expect(response.body.id).toBe(product.id);
    expect(response.body.name).toBe('Netflix Premium');
  });

  it('should update product', async () => {
    const response = await request(app.getHttpServer())
      .patch(`/products/${product.id}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        price: 499,
        description: 'Plano Premium Atualizado',
      })
      .expect(200);

    expect(response.body.price).toBe(499);
    expect(response.body.description).toBe('Plano Premium Atualizado');

    product = response.body;
  });

  it('should delete product', async () => {
    await request(app.getHttpServer())
      .delete(`/products/${product.id}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);
  });

  it('should deactivate product instead of deleting it', async () => {
    const response = await request(app.getHttpServer())
      .get(`/products/${product.id}`)
      .expect(200);

    expect(response.body.id).toBe(product.id);
    expect(response.body.active).toBe(false);
  });

  it('should not list inactive products', async () => {
    const response = await request(app.getHttpServer())
      .get('/products')
      .expect(200);

    const found = response.body.find(
      (p: any) => p.id === product.id,
    );

    expect(found).toBeUndefined();
  });
});