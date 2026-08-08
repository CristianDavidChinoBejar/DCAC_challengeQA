import { validateSchema } from '../support/helpers/schema_validator';
import { loginSchema } from '../fixtures/schemas/login_schema';
import { cartSchema } from '../fixtures/schemas/cart_schema';

describe('Test para el challenge en FakeStore API', () => {
  let authToken: string;
  let dynamicProducts: Array<{ productId: number; quantity: number }> = [];

  before(() => {
    cy.request('GET', '/products').then((response) => {
      expect(response.status).to.eq(200);

      dynamicProducts = response.body.slice(0, 3).map((product: { id: number }) => ({
        productId: product.id,
        quantity: Math.floor(Math.random() * 5) + 1
      }));
    });
  });

  context('Autenticación Login y almacenamiento de token', () => {
    
    it('Verificar autenticación fallida en el login con credenciales inválidas', () => {
      cy.login('invalid_username', 'invalid_password').then((response) => {
        expect(response.status).to.eq(401);
        expect(response.body).to.not.have.property('token');
      });
    });

    it('Verificar autenticación exitosa en el login con contrato válido', () => {
      const validUsername = Cypress.env('auth_username');
      const validPassword = Cypress.env('auth_password');

      cy.log(`Username: ${validUsername}`);
      cy.log(`Password: ${validPassword}`);

      cy.login(validUsername, validPassword).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.token).to.not.be.empty;

        validateSchema(loginSchema, response.body);

        authToken = response.body.token;
      });
    });
  
  });

  context('Creación de Carrito y reutilizando de Token con productos dinámicos)', () => {

    it('Creación de nuevo carrito con 3 productos dinámicos reutilizando Token', () => {
      expect(authToken).to.be.a('string').and.not.be.empty;
      expect(dynamicProducts).to.have.lengthOf(3);

      const cartPayload = {
        userId: Cypress.env('user_id'),
        date: new Date().toISOString().split('T')[0],
        products: dynamicProducts
      };

      cy.request({
        method: 'POST',
        url: '/carts',
        headers: {
          Authorization: `Bearer ${authToken}`
        },
        body: cartPayload
      }).then((response) => {
        expect(response.status).to.be.eq(201);
        expect(response.body).to.have.property('id');
        expect(response.body.products).to.be.an('array').with.lengthOf(3);
        expect(response.body.products[0].productId).to.eq(dynamicProducts[0].productId);

        validateSchema(cartSchema, response.body);
      });
    });
  });

});