import { validateSchema } from '../../support/helpers/schema_validator';
import { loginSchema } from '../../fixtures/schemas/login_schema';
import { cartSchema } from '../../fixtures/schemas/cart_schema';
import { todayDate } from '../../support/helpers/get_today_date';
import { API_URL } from '../../support/constants/urls';

interface CartProduct {
  productId: number;
  quantity: number;
}

describe('Test para el challenge en FakeStore API', () => {
  let authToken: string;
  let dynamicProducts: Array<CartProduct> = [];
  let additionalProduct: CartProduct;

  before(() => {
    cy.request('GET', `${API_URL}/products`).then((response) => {
      expect(response.status).to.eq(200);

      const selectRandomProducts = Cypress._.sampleSize(response.body, 4);

      dynamicProducts = selectRandomProducts.slice(0, 3).map((product: { id: number }) => ({
        productId: product.id,
        quantity: Cypress._.random(1, 5)
      }));

      additionalProduct = {
        productId: selectRandomProducts[3].id,
        quantity: Cypress._.random(1, 5)
      }
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

      cy.login(validUsername, validPassword).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.token).to.not.be.empty;

        validateSchema(loginSchema, response.body);

        authToken = response.body.token;
      });
    });
  
  });

  context('Flujo de Carrito y reutilización del Token con productos dinámicos', () => {
    
    let newCartId: number;

    it('Creación de nuevo carrito con 3 productos dinámicos reutilizando Token', () => {
      expect(authToken).to.be.a('string').and.not.be.empty;
      expect(dynamicProducts).to.have.lengthOf(3);

      const cartPayload = {
        userId: Cypress.env('user_id'),
        date: todayDate,
        products: dynamicProducts
      };

      cy.request({
        method: 'POST',
        url: `${API_URL}/carts`,
        headers: {
          Authorization: `Bearer ${authToken}`
        },
        body: cartPayload
      }).then((response) => {
        expect(response.status).to.be.eq(201);
        expect(response.body).to.have.property('id');
        expect(response.body.products).to.be.an('array').with.lengthOf(3);
        expect(response.body.products[0].productId).to.eq(dynamicProducts[0].productId);
        cy.log(`Response del POST: ${JSON.stringify(response.body)}`);

        validateSchema(cartSchema, response.body);

        newCartId = response.body.id;
      });
    });

    it('Actualización del carrito agregando un producto dinámico adicional', () => {
      const updatedProducts = [...dynamicProducts, additionalProduct];
      const updateCartPayload = {
        userId: Cypress.env('user_id'),
        date: todayDate,
        products: updatedProducts
      };

      cy.request({
        method: 'PUT',
        url: `${API_URL}/carts/${newCartId}`,
        headers: {
          Authorization: `Bearer ${authToken}`
        },
        body: updateCartPayload
      }).then((response) => {
        expect(response.status).to.be.eq(200);
        expect(response.body.products).to.be.an('array').with.lengthOf(4);
        expect(response.body.products[3].productId).to.eq(additionalProduct.productId);
        cy.log(`Response del Update: ${JSON.stringify(response.body)}`);

        validateSchema(cartSchema, response.body);
      });
    });

    /**
     * @note La creación del carrito en FakeStore siempre retorna "id": 11, es un valor fijo.
     * La herencia de este ID hace que el DELETE retorne NULL con statusCode 200.
     * Esto es un comportamiento esperado, no un error en el test.
     * Se omite realizar validateSchema para la respuesta del DELETE, ya que no cumpliria el contrato declarado en cart_schema.ts.
     * GET /carts retorna la existencia de 7 carritos, y el DELETE sobre alguno de estos valores si retornaria un contrato válido, pero no es el caso de este flujo
     */
    it('Eliminación del carrito creado', () => {
      cy.request({
        method: 'DELETE',
        url: `${API_URL}/carts/${newCartId}`,
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      }).then((response) => {
        expect(response.status).to.be.eq(200);
        expect(response.body).to.be.null;
        cy.log(`Respuesta después del Delete: ${JSON.stringify(response.body)}`);
      });
    });

  });
});