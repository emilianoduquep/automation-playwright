const {expect} = require('@playwright/test');
class CartCheckout{

    constructor(page, product){
        this.page = page;
        this.product = product;
        this.elements = this.page.locator("div li");
        this.checkout = this.page.locator("text=Checkout");
    }

    async cartCheckoutMethod(){
        await this.elements.first().waitFor();
        const boolValue = await this.page.locator("h3:has-text('"+this.product+"')").isVisible();
        expect(boolValue).toBeTruthy();
        await this.checkout.click();
    }
}
module.exports = { CartCheckout };