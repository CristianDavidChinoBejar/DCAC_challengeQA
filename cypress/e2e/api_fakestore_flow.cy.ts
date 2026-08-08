import { validateSchema } from '../support/helpers/schema_validator';
import { loginSchema } from '../fixtures/schemas/login_schema';

describe('Modulo de Autenticacion y Manejo de Tokens - FakeStore API', () => {
  let authToken: string;

  context('Autenticación y Login', () => {

    it('Verificar autenticación exitosa con contrato válido', () => {
      const validUsername = Cypress.env('USERNAME');
      const validPassword = Cypress.env('PASSWORD');

      cy.login(validUsername, validPassword).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.token).to.not.be.empty;

        validateSchema(loginSchema, response.body);

        authToken = response.body.token;
      });
    });

    it('Verificar autenticación fallida en el login con credenciales inválidas', () => {
      cy.login('invalid_username', 'invalid_password').then((response) => {
        expect(response.status).to.eq(401);
        expect(response.body).to.not.have.property('token');
      });
    });

  });
});