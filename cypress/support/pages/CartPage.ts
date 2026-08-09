export class CartPage {
    private cartItem = '[data-test="inventory-item"]';
    private itemName = '[data-test="inventory-item-name"]';
    private itemPrice = '[data-test="inventory-item-price"]';
    private checkoutBtn = '[data-test="checkout"]';

    validateCartItems(expectedProductsCart: Array<{ name: string; price: string }>) {
    cy.get(this.cartItem).should('have.length', expectedProductsCart.length);

    expectedProductsCart.forEach((expectedProduct) => {
        cy.get(this.cartItem).contains(this.itemName, expectedProduct.name).should('be.visible');
        cy.contains(this.cartItem, expectedProduct.name)
            .find(this.itemPrice).should('have.text', expectedProduct.price);
    });
    }

    checkoutButton() {
        return cy.get(this.checkoutBtn);
    }
}