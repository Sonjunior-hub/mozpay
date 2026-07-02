import { DEFAULT_PASSWORD } from '../helpers/constants';

export function makeAdmin() {
  const random = Date.now() + Math.floor(Math.random() * 1000);

  return {
    name: `Admin ${random}`,
    email: `admin${random}@email.com`,
    phone: `85${random}`.slice(0, 9),
    password: DEFAULT_PASSWORD,
    role: 'ADMIN',
  };
}