import { DEFAULT_PASSWORD } from '../helpers/constants';
import { randomUUID } from 'crypto';

export function makeUser() {
  const id = randomUUID();

  return {
    name: `User ${id}`,
    email: `${id}@email.com`,
    phone: `84${Math.floor(1000000 + Math.random() * 9000000)}`,
    password: DEFAULT_PASSWORD,
  };
}