declare module 'cypress-mochawesome-reporter/plugin';

interface LoginResponse {
  token: string;
}

declare namespace Cypress {
  interface Chainable {
    /**
     * @example cy.login('username', 'password')
     */
    login(username?: string, password?: string): Chainable<Cypress.Response<LoginResponse>>;
    login_bypass(username?: string): Chainable<void>;
  }
}