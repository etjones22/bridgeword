import { expect, test } from 'vitest';
import { scoreGuess } from '../src/lib/puzzles';

test('scoreGuess counts correct matches', () => {
  const combos = ['fire ant', 'firefighter', 'firecracker', 'firewall'];
  expect(scoreGuess('fire', combos)).toBe(4);
  expect(scoreGuess('ant', combos)).toBe(1);
  expect(scoreGuess('cracker', combos)).toBe(1);
  expect(scoreGuess('water', combos)).toBe(0);
});