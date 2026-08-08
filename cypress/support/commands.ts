Cypress.Commands.add('login', (username?: string, password?: string) => {
    const user = username || Cypress.env('auth_username');
    const pass = password || Cypress.env('auth_password');

    return cy.request({
        method: 'POST',
        url: '/auth/login',
        body: {
        username: user,
        password: pass
        },
        failOnStatusCode: false
    });
});