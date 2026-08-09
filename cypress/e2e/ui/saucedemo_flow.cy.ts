///<reference types="cypress" />

import { InventoryPage } from '../../support/pages/InventoryPage';
import { CartPage } from '../../support/pages/CartPage';
import { CheckoutPage } from '../../support/pages/CheckoutPage';
import { API_URL } from '../../support/constants/urls';

describe('Saucedemo - E2E Flow', () => {
    const inventoryPage = new InventoryPage();
    const cartPage = new CartPage();
    const checkoutPage = new CheckoutPage();
    let checkoutData: { firstName: string; lastName: string; postalCode: string };

    before(() => {
        cy.request('GET', `${API_URL}/users/1`).then((response) => {
            expect(response.status).to.eq(200);

            const userData = response.body;
            checkoutData = {
                firstName: userData.name.firstname,
                lastName: userData.name.lastname,
                postalCode: userData.address.zipcode
            }
        })
    });

    beforeEach(() => {
        cy.loginBypass();
    });

    it('Completar exitosamente el flujo de compra de 4 productos seleccionados', () => {
        inventoryPage.addRandomProductsToCart(4).then((selectProducts) => {
        inventoryPage.getCartCount().should('eq', 4);
        inventoryPage.goToCart();

        cartPage.validateCartItems(selectProducts);
        cartPage.checkoutButton().click();

        checkoutPage.fillCheckoutInformation(
            checkoutData.firstName,
            checkoutData.lastName,
            checkoutData.postalCode
        );

        checkoutPage.finishButton().click();

        checkoutPage.orderCompletion()
            .should('be.visible')
            .and('have.text', 'Thank you for your order!');
        });
    });
});