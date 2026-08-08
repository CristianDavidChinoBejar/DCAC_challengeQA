Cypress.Commands.add('login', (username?: string, password?: string) => {
    const user = username || Cypress.expose('auth_username');
    const pass = password || Cypress.expose('auth_password');

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