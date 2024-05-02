class LoginPage {
    constructor(page){
        this.page = page;
        this.email = this.page.locator("#userEmail");
        this.password = this.page.locator("#userPassword");
        this.loginButton = this.page.locator("[value='Login']");
    }

    async goTo(){
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async loginPage(){
        await this.email.fill("edp@gmail.com");
        await this.password.fill("Nano1973!");
        await this.loginButton.click();
    }
}
module.exports = { LoginPage }