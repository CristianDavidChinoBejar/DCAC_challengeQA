// Definimos el contrato de la respuesta esperada
interface LoginResponse {
  token: string;
}

declare namespace Cypress {
  interface Chainable {
    /**
     * @example cy.login('username', 'password')
     */
    login(username?: string, password?: string): Chainable<Cypress.Response<LoginResponse>>;
  }
}