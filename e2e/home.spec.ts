import { test, expect } from '@playwright/test';

test('homepage loads and displays clues', async ({ page }) => {
  await page.goto('/');
  // Wait for the clue badges to appear
  const badges = await page.locator('main div span.inline-flex').all();
  expect(badges.length).toBeGreaterThanOrEqual(4);
});