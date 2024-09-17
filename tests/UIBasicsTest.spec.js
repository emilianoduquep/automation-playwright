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

test('UI Controls', async ({page}) => {

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const userName = page.locator("input#username");
    const userPassword = page.locator("input#password");
    const sighIn = page.locator("#signInBtn");

    await userName.fill("rahulshettyacademy");
    await userPassword.fill("learning");

    // select dropdown menus
    await page.locator("select.form-control").selectOption("consult");
    await page.locator("select.form-control").selectOption({label: 'Student'});

    // select radio buttons
    await page.locator(".radiotextsty").last().click();

    // assertion
    expect(page.locator(".radiotextsty").last()).toBeChecked();

    // this assertion will verify a boolean value
    const isChecked = await page.locator(".radiotextsty").last().isChecked();
    console.log(isChecked);
    expect(isChecked).toBeTruthy();

    await page.locator("#okayBtn").click();

    // checkbox
    await page.locator("#terms").click();
    expect(await page.locator("#terms")).toBeChecked();
    // with this command we are going to uncheck
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();

    // check it again
    await page.locator("#terms").click();
    expect(await page.locator("#terms").isChecked()).toBeTruthy();


    // assertion to verify if the locator conteins or has a certain attribute present.
    await expect(page.locator("[href*='documents-request']")).toHaveAttribute("class","blinkingText");

    /*
        what happens when we click on a link and it takes us to another tab?
        that needs to be handled in a different way. Check the video 20
    */

});

test('Child window handle', async ({browser}) => {
    // in this example we are going to work how to handle child windows
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");
    const userName = page.locator("input#username");

    // here is the trick: we need to have a listener to pay attention to the new window that will get opened.
    const [newPage] = await Promise.all([
        context.waitForEvent('page'), // listen for any new page (pending, fullfilled, rejected).
        documentLink.click(), // new page is opened.
    ])

    const text1 = await newPage.locator(".red").textContent(); 
    const text2 = text1.split('@');
    const text3 = text2[1].split(" ");
    const text4 = text3[0];
    

    console.log(text1);
    //Please email us at mentor@rahulshettyacademy.com with below template to receive response 
    console.log(text2);
    //['Please email us at mentor', 'rahulshettyacademy.com with below template to receive response ']
    console.log(text3);
    // ['rahulshettyacademy.com',  'with',  'below',  'template',  'to',  'receive',  'response',  '']
    console.log(text4);
    // rahulshettyacademy.com


    await page.locator("input#username").fill(text4); // with this you go back to the parent page.
    
    
});

test('verify the selected value', async({page}) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const texto = await page.locator("select[class='form-control']").textContent();
    console.log(texto);
    console.log(__dirname);
})

