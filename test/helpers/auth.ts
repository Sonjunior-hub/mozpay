import request from 'supertest';

import { prisma } from './database';

import { makeUser } from '../factories/user.factory';

export async function registerAndLogin(app: any) {
  const user = makeUser();

  await request(app.getHttpServer())
    .post('/auth/register')
    .send(user)
    .expect(201);

  const login = await request(app.getHttpServer())
    .post('/auth/login')
    .send({
      email: user.email,
      password: user.password,
    })
    .expect(201);

  return {
    token: login.body.access_token,
    user,
  };
}

export async function registerAndLoginAdmin(app: any) {
  const user = makeUser();

  await request(app.getHttpServer())
    .post('/auth/register')
    .send(user)
    .expect(201);

  await prisma.user.update({
    where: {
      email: user.email,
    },
    data: {
      role: 'ADMIN',
    },
  });

  const login = await request(app.getHttpServer())
    .post('/auth/login')
    .send({
      email: user.email,
      password: user.password,
    })
    .expect(201);

  return {
    token: login.body.access_token,
    user,
  };
}