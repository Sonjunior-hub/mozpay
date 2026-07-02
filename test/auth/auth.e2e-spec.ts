import request from 'supertest';

import {
  closeTestingApp,
  createTestingApp,
} from '../helpers/app';

import { registerAndLogin } from '../helpers/auth';

import {
  setupTestDatabase,
  teardownTestDatabase,
} from '../helpers/test-database';

describe('Auth E2E', () => {
  let app;

  beforeAll(async () => {
    await setupTestDatabase();

    app = await createTestingApp();
  });

  afterAll(async () => {
    await closeTestingApp();

    await teardownTestDatabase();
  });

  it('should register and login successfully', async () => {
    const { token, user } = await registerAndLogin(app);

    expect(token).toBeDefined();

    const profile = await request(app.getHttpServer())
      .get('/auth/profile')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(profile.body.email).toBe(user.email);
  });

  it('should reject invalid token', async () => {
    await request(app.getHttpServer())
      .get('/auth/profile')
      .set('Authorization', 'Bearer invalid-token')
      .expect(401);
  });

  it('should reject request without token', async () => {
    await request(app.getHttpServer())
      .get('/auth/profile')
      .expect(401);
  });
});