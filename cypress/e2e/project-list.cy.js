describe('Project List Scene - Cypress', () => {
  beforeEach(() => {
    // 1. Login inicial
    cy.visit('/#/');
    cy.get('input[name="user"]').type('admin');
    cy.get('input[name="password"]').type('test');
    cy.contains('button', 'Login').click();

    // 2. Navegación al módulo de proyectos
    cy.url().should('include', 'submodule-list');
    cy.contains('Proyectos').click();
    cy.url().should('include', 'projects');
  });

  it('debería listar los proyectos cargados en la tabla', () => {
    cy.contains('Bankia').should('be.visible');
    cy.contains('Mapfre').should('be.visible');
  });

  it('debería filtrar proyectos al usar el buscador', () => {
    cy.get('input[placeholder="Buscar proyecto"]').type('Bankia');
    cy.contains('Bankia').should('be.visible');
    cy.contains('Mapfre').should('not.exist');
  });

  it('debería abrir el diálogo de confirmación al eliminar un proyecto', () => {
    // Hacemos clic en el último botón (DeleteIcon) de la primera fila
    cy.get('tbody tr').first().find('button').last().click();

    cy.contains('Eliminar Proyecto').should('be.visible');
    cy.contains('¿Seguro que quiere borrar a').should('be.visible');
  });
});
