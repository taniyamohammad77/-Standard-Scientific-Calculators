import { test, expect } from '@playwright/test';
test('worker evaluation, exact output, settings and recoverable errors', async ({ page }) => {
  await page.goto('/');
  const input = page.getByLabel('Expression', { exact: true });
  const output = page.getByLabel('Calculation result');
  await page.getByRole('button', { name: 'Calculate', exact: true }).click();
  await expect(output).toHaveText('1/2');
  await input.fill('sqrt(8)'); await input.press('Enter'); await expect(output).toHaveText('2√(2)');
  await input.fill('1/0'); await input.press('Enter'); await expect(page.getByRole('alert')).toContainText('divide by zero');
  await input.fill('2+3*4'); await input.press('Enter'); await expect(output).toHaveText('14');
  await page.getByLabel('Result format').selectOption('FIX'); await page.getByLabel('Digits',{exact:true}).selectOption('3');
  await input.fill('1/3'); await input.press('Enter'); await expect(output).toHaveText('0.333');
  await page.getByRole('button', { name: 'RAD', exact: true }).click();
  await expect(input).toHaveValue('1/3');
  await page.getByLabel('Result format').selectOption('EXACT');
  await input.fill('cos(pi)'); await input.press('Enter'); await expect(output).toHaveText('-1');
  await input.fill('<script>alert(1)</script>'); await input.press('Enter'); await expect(page.getByRole('alert')).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
