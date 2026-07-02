import {
  cleanDatabase,
  connectDatabase,
  disconnectDatabase,
} from './database';

export async function setupTestDatabase() {
  await connectDatabase();
  await cleanDatabase();
}

export async function teardownTestDatabase() {
  await cleanDatabase();
  await disconnectDatabase();
}