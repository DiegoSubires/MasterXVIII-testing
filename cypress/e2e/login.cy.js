describe('Login Scene - Cypress', () => {
  beforeEach(() => {
    // Navegamos a la página principal / login
    cy.visit('/');
  });

  it('should display error message with invalid credentials', () => {
    // Escribimos credenciales incorrectas
    cy.get('input[name="user"]').type('invalidUser');
    cy.get('input[name="password"]').type('wrongPassword');

    // Pulsamos el botón de login
    cy.contains('button', 'Login').click();

    // Verificamos que se muestre algún mensaje o feedback de error
    cy.get('.MuiSnackbar-root').should('be.visible');
  });

  it('should navigate to submodule list on successful login', () => {
    // Escribimos credenciales válidas (p. ej. admin/admin o las configuradas en el mock)
    cy.get('input[name="user"]').type('admin');
    cy.get('input[name="password"]').type('test');

    // Pulsamos en Login
    cy.contains('button', 'Login').click();

    // Verificamos que la URL haya cambiado a la ruta de submodules
    cy.url().should('include', '/submodule-list');
  });
});
