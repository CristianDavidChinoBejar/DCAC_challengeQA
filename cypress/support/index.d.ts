/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     Custom command para autenticación contra la API.
     @example cy.login('username', 'password')
    */
    login(username?: string, password?: string): Chainable<Response<any>>;
  }
}