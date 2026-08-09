declare module 'cypress-mochawesome-reporter/plugin';

interface LoginResponse {
  token: string;
}

declare namespace Cypress {
  interface Chainable {
    /**
     * @example cy.login('username', 'password')
     */
    loginApi(username?: string, password?: string): Chainable<Cypress.Response<LoginResponse>>;
    loginBypass(username?: string): Chainable<void>;
  }
}