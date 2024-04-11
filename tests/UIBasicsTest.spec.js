const {test, expect} = require('@playwright/test');

test('Browser Context - Playwright test', async ({browser}) => {

    // first we need to create a browser context
    // chrome - plugins, cookies

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const userName = page.locator("input#username");
    const userPassword = page.locator("input#password");
    const sighIn = page.locator("#signInBtn");

    console.log(await page.title());
    await userName.fill("learing");
    await userPassword.fill("learning");
    await sighIn.click();
    // note: in this case if the loggin fails, there is a message that shows up 3 seconds after,
    // and the goal here is to be able to get that message and analize it.
    console.log(await page.locator("[style*='block']").textContent());
    
    // in this assertion we are verifying that the word 'Incorrect' is included in the message captured
    // by the locator.
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');

    // in this scenario, we clean the entry for the username and write the correct values to get in.
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await sighIn.click();

    // after correct login, the page opens another page with products and we are going to use the 
    // ".card-body a" locator to get the name of the items
    const cardTitles = page.locator(".card-body a");
    const firstElement1 = await cardTitles.nth(0).textContent(); // nth(3)... selects the one needed.
    const firstElement2 = await cardTitles.first().textContent(); // last()
    console.log(firstElement1);
    console.log(firstElement2);

    // imagine we need to have all the list of products
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
});

// this is a test example using the page fixture
test('Page - Playwright test', async ({page}) => {

    await page.goto("https://google.com");
    // get the title and write an assertion to see if it is ok

    await expect(page).toHaveTitle("Google");

});


