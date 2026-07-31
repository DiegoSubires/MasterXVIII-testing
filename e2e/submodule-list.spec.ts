import { test, expect } from '@playwright/test';

test.describe('Submodule List Scene - Playwright', () => {
  test.beforeEach(async ({ page }) => {
    // 1. Navegamos al inicio (Login)
    await page.goto('/#/');

    // 2. Mock por si la API valida contra backend
    await page.route('**/api/login*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ token: 'fake-jwt-token' }),
      });
    });

    // 3. Iniciamos sesión con los selectores exactos de tu login.spec.ts
    await page.locator('input[name="user"]').fill('admin');
    await page.locator('input[name="password"]').fill('test');
    await page.getByRole('button', { name: 'Login' }).click();

    // 4. Esperamos a llegar a la pantalla de submódulos
    await expect(page).toHaveURL(/.*submodule-list/);
  });

  test('debería mostrar las tarjetas principales de navegación', async ({
    page,
  }) => {
    await expect(page.getByText('Proyectos')).toBeVisible();
    await expect(page.getByText('Empleados')).toBeVisible();
  });

  test('debería navegar a la vista de proyectos al hacer clic en Proyectos', async ({
    page,
  }) => {
    await page.getByText('Proyectos').click();
    await expect(page).toHaveURL(/.*projects/);
  });

  test('debería navegar a la vista de empleados al hacer clic en Empleados', async ({
    page,
  }) => {
    await page.getByText('Empleados').click();
    await expect(page).toHaveURL(/.*employees/);
  });
});
