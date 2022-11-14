import { randomNumber } from './random';

export function uniqueId() {
  const num = randomNumber(randomNumber(1, 100), randomNumber(101, 201));
  return Math.round(Date.now() * num + Date.now() / num);
}
