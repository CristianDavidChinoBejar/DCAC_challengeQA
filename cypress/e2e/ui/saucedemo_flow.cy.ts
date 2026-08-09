///<reference types="cypress" />

describe('Saucedemo - E2E Flow', () => {
  beforeEach(() => {
    cy.login_bypass('standard_user');
  });

  it('Ingresar al home de Souce demo', () => {
    cy.url().should('include', '/inventory.html');
  });
});