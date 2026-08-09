/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * @example cy.loginAPI('user', 'password')
     */
    login(username?: string, password?: string): Chainable<Response<any>>;
  }
}