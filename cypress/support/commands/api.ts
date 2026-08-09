import { API_URL } from '../constants/urls';

Cypress.Commands.add('loginApi', (username?: string, password?: string) => {
    const user = username || Cypress.env('auth_username');
    const pass = password || Cypress.env('auth_password');

    return cy.request({
        method: 'POST',
        url: `${API_URL}/auth/login`,
        body: {
        username: user,
        password: pass
        },
        failOnStatusCode: false
    });
});