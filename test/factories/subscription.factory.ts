export function makeSubscription() {
  return {
    status: 'ACTIVE',
    startDate: new Date(),
    endDate: new Date(
      Date.now() + 30 * 24 * 60 * 60 * 1000,
    ),
  };
}