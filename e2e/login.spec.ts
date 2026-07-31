import { test, expect } from '@playwright/test';

test.describe('Login Scene - Playwright', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display error snackbar on invalid credentials', async ({
    page,
  }) => {
    await page.locator('input[name="user"]').fill('userErroneo');
    await page.locator('input[name="password"]').fill('claveErronea');
    await page.getByRole('button', { name: 'Login' }).click();

    // Verificamos que aparece el mensaje/snackbar
    const snackbar = page.locator('.MuiSnackbar-root');
    await expect(snackbar).toBeVisible();
  });

  test('should navigate to submodule-list on valid login', async ({ page }) => {
    await page.locator('input[name="user"]').fill('admin');
    await page.locator('input[name="password"]').fill('test');
    await page.getByRole('button', { name: 'Login' }).click();

    // Verificamos que navega a la URL esperada
    await expect(page).toHaveURL(/.*submodule-list/);
  });
});
