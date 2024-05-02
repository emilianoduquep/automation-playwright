const { expect } = require('@playwright/test');
class PaymentVerification{
    constructor(page){
        this.page = page;
        this.country = this.page.locator("[placeholder*='Select Country']");
        this.countryMatches = this.page.locator(".ta-results");
        this.email =  "edp@gmail.com";
        this.textWithEmail = this.page.locator(".user__name label");
        this.submit = this.page.locator(".action__submit");
    }

    async payment(){

        await this.country.pressSequentially("ind");
        const dropdown = this.countryMatches; // 3 matches
        await dropdown.waitFor();
        const optionsCount = await dropdown.locator("button").count(); // 3 options

        for(let i = 0; i < optionsCount; i++)
        {
            let text = await dropdown.locator("button").nth(i).textContent();
            if (text === " India")
            {
                await dropdown.locator("button").nth(i).click();
                break;
            }
        }
        
        const writtenEmail = await this.textWithEmail.textContent();
        console.log("The email written is: " + writtenEmail);
        await expect(this.textWithEmail).toHaveText(this.email);
        await this.submit.click();
    }
}
module.exports = { PaymentVerification };