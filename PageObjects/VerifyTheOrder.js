const { expect } = require('@playwright/test');

class VerifyTheOrder{
    constructor(page){
        this.page = page;
        this.thanksOrder = this.page.locator(".hero-primary");
        this.orederNumber = this.page.locator(".em-spacer-1 .ng-star-inserted");
        this.orderTab = this.page.locator(".btn.btn-custom[routerlink='/dashboard/myorders']");
        this.allOrdersInPage = this.page.locator("tbody");
        this.howManyRows = this.page.locator("tbody tr");
        this.orderText = this.page.locator(".col-text");
    }

    async verifyTheOrderMethod(){
        await expect(this.thanksOrder).toHaveText(" Thankyou for the order. ");

        // this is to get the order number
        const orderId = await this.orederNumber.textContent();
        console.log("the order number is: " + orderId);

        // now on the top, we are going to click on the Orders tab
        await this.orderTab.click();

        // waits for the page to load all the orders present in the page.
        await this.allOrdersInPage.waitFor();

        // this will let us know how many lines of orders has been submitted.
        const rows = this.howManyRows;

        // in this for, we are going to select the one that includes de order number
        for(let i = 0; i < await rows.count(); i++)
        {
            // here we are using chaining locator to only verify the oder inside the selected row.
            const rowOrderId = await rows.nth(i).locator("th").textContent();

            if(orderId.includes(rowOrderId)) // this verifies a match inside the string.
            {
                // selects the 'view' button when we select the first buttton, since this shows 2 elements.
                await rows.nth(i).locator("button.btn.btn-primary").first().click(); // this takes us to the order summary page.
                break; // this is used in javascript to exit from the for cycle.
            }
        }

        // this will get the order number and verify.
        const orderIdDetails = await this.orderText.textContent();
        expect(orderId.includes(orderIdDetails)).toBeTruthy();   
    }
}
module.exports = { VerifyTheOrder };