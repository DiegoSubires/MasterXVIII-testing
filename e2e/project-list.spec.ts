import { test, expect } from '@playwright/test';

test.describe('Project List Scene - Playwright', () => {
  test.beforeEach(async ({ page }) => {
    // 1. Login inicial
    await page.goto('/#/');
    await page.locator('input[name="user"]').fill('admin');
    await page.locator('input[name="password"]').fill('test');
    await page.getByRole('button', { name: 'Login' }).click();

    // 2. Navegación orgánica a través del Dashboard para evitar cierres abruptos de rutas
    await expect(page).toHaveURL(/.*submodule-list/);
    await page.getByText('Proyectos').click();
    await expect(page).toHaveURL(/.*projects/);
  });

  test('debería mostrar los proyectos iniciales en la tabla', async ({
    page,
  }) => {
    // Verificamos proyectos existentes en el mock real de la app (mockProjectList)
    await expect(page.getByText('Bankia')).toBeVisible();
    await expect(page.getByText('Mapfre')).toBeVisible();
  });

  test('debería filtrar proyectos al escribir en el buscador', async ({
    page,
  }) => {
    // Usamos el placeholder configurado en project-list.component.tsx
    await page.getByPlaceholder('Buscar proyecto').fill('Bankia');

    await expect(page.getByText('Bankia')).toBeVisible();
    await expect(page.getByText('Mapfre')).not.toBeVisible();
  });

  test('debería abrir el diálogo de confirmación al hacer clic en eliminar', async ({
    page,
  }) => {
    // Seleccionamos la primera fila de la tabla y hacemos clic en el icono de papelera (último botón)
    const firstRow = page.locator('tbody tr').first();
    await firstRow.locator('button').last().click();

    // Verificamos el modal configurado en project-list.component.tsx
    await expect(page.getByText('Eliminar Proyecto')).toBeVisible();
    await expect(page.getByText(/¿Seguro que quiere borrar a/i)).toBeVisible();
  });
});
