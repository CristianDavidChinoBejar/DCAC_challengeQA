export class CheckoutPage {
    private firstNameInput = '[data-test="firstName"]';
    private lastNameInput = '[data-test="lastName"]';
    private postalCodeInput = '[data-test="postalCode"]';
    private continueButton = '[data-test="continue"]';
    private finish = '[data-test="finish"]';
    private finalTitle = '[data-test="complete-header"]';

    fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
        cy.get(this.firstNameInput).type(firstName);
        cy.get(this.lastNameInput).type(lastName);
        cy.get(this.postalCodeInput).type(postalCode);
        cy.get(this.continueButton).click();
    }

    finishButton() {
        return cy.get(this.finish);
    }

    orderCompletion() {
        return cy.get(this.finalTitle);
    }
}