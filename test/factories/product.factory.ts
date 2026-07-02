export function makeProduct() {
  const random = Date.now();

  return {
    name: `Netflix ${random}`,
    provider: 'Netflix',
    description: 'Plano Premium',
    price: 399,
    duration: 30,
    active: true,
  };
}