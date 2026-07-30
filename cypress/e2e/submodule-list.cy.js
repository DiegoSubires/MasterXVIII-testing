describe('Submodule List Scene - Cypress', () => {
  beforeEach(() => {
    // 1. Visitamos la página de login
    cy.visit('/#/');

    // 2. Mock por si la API valida contra backend
    cy.intercept('POST', '**/api/login*', {
      statusCode: 200,
      body: { token: 'fake-jwt-token' },
    }).as('loginRequest');

    // 3. Rellenamos credenciales usando los campos reales (user / password)
    cy.get('input[name="user"]').type('admin');
    cy.get('input[name="password"]').type('test');
    cy.contains('button', 'Login').click();

    // 4. Confirmamos la llegada a la URL del submódulo
    cy.url().should('include', 'submodule-list');
  });

  it('debería mostrar las tarjetas principales de navegación', () => {
    cy.contains('Proyectos').should('be.visible');
    cy.contains('Empleados').should('be.visible');
  });

  it('debería navegar a la vista de proyectos al hacer clic en Proyectos', () => {
    cy.contains('Proyectos').click();
    cy.url().should('include', 'projects');
  });

  it('debería navegar a la vista de empleados al hacer clic en Empleados', () => {
    cy.contains('Empleados').click();
    cy.url().should('include', 'employees');
  });
});
