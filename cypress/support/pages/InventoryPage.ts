export class InventoryPage {
    private inventoryItems = '[data-test="inventory-item"]';
    private itemName = '[data-test="inventory-item-name"]';
    private itemPrice = '[data-test="inventory-item-price"]';
    private addToCartBtn = 'button[data-test^="add-to-cart"]';
    private shoppingCartBadge = '[data-test="shopping-cart-badge"]';
    private shoppingCartLink = '[data-test="shopping-cart-link"]';

    addRandomProductsToCart(count: number = 3) {
        const selectProducts: Array<{ name: string; price: string }> = [];

        return cy.get(this.inventoryItems).then(($items) => {
            const randomProducts = Cypress._.sampleSize($items.toArray(), count);

            randomProducts.forEach((item) => {
                const name = Cypress.$(item).find(this.itemName).text().trim();
                const price = Cypress.$(item).find(this.itemPrice).text().trim();

            selectProducts.push({ name, price });

            cy.wrap(item).find(this.addToCartBtn).click();
            });

            return cy.wrap(selectProducts);
        });
    }

    getCartCount() {
        return cy.get(this.shoppingCartBadge).invoke('text').then(parseInt);
    }

    goToCart() {
        cy.get(this.shoppingCartLink).click();
    }
}