import { UI_URL } from '../constants/urls';

Cypress.Commands.add('loginBypass', (username: string = 'standard_user') => {
    cy.clearCookies();
    cy.setCookie('session-username', username, {
        domain: UI_URL
    });

    cy.visit(`${UI_URL}/inventory.html`, { failOnStatusCode: false });
});