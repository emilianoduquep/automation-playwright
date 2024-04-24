const {test, expect, request} = require('@playwright/test');

// estas variables son globales
const loginPayLoad = {userEmail: "edp@gmail.com", userPassword: "Nano1973!"};
let token;

// esta parte es para usar el poder de las api calls
// 
test.beforeAll( async () => {

    // la variable loginPayLoad, es basicamente la informacion del email y password que le enviamos a la aplicacion.
    // esta informacion se saca del inspector, en la parte de network/fetch/name/payload
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {data: loginPayLoad})
    
    // el valor que retorna trae un response, que contiene entre otras cosas un json, el cual contiene un token
    expect(loginResponse.ok()).toBeTruthy();
    
    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;
    console.log(token);
});

test.only('Client App login - waitForLoadState', async ({page}) => {

    // esta parte es puro javascript para insertar el valor del token en el local storage
    // notese que el argumento de la cuncion se llama value, pero lo que va a pasar es el token que se le esta pasando
    // como segundo argumento en la funcion
    page.addInitScript(value => {
        window.localStorage.setItem('token',value);
    }, token)

    await page.goto("https://rahulshettyacademy.com/client");

    const products = page.locator(".card-body");
    const productName = "ZARA COAT 3";

    
    // await page.locator("#userEmail").fill("edp@gmail.com");
    // await page.locator("#userPassword").fill("Nano1973!");
    // await page.locator("[value='Login']").click();

    // // with the next line, we force the page to wait until the DOM is loade with the textContent() method.
    // // const firstTitle = await page.locator(".card-body b").first().textContent();
    // // suppose I want to get all elements in the next page
    // // If we use the allTextContents() method without the previous line, this will give us the [] empty array because this method does not wait 
    // // until the object is attached to the DOM. const titles = await page.locator(".card-body b").allTextContents();

    // // to wait until all the network calls have finished, we can ask playwright to wait using the waitForLoadState()

    // await page.waitForLoadState('networkidle');

    // then, this is suppossed to wait until all the calls are successfully made, then we will be able to get the allTextContents() method.
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    // Zara Coat 3
    const countAmount = await products.count();

    for(let i = 0; i < countAmount; i++)
    {
        // in this if, we are selecting only the text of the product to compare with the wanted one.
        if (await products.nth(i).locator("b").textContent() === productName)
        {
            // add to cart
            await products.nth(i).locator("text =  Add To Cart").click();
            break;
            
        }  
    }

    await page.locator("[routerlink*=cart]").click();
    
    // ojo: aca si no coloco first() me encuentra varios div li pero waitFor() no funciona para todos, 
    // por eso se selecciona solo el primero para que funcione.
    // this element: .isVisible() does not have auto-waiting. That's why the previous line has to be written.
    await page.locator("div li").first().waitFor(); // first is needed here becouse there are 6 elemnts matching this locator.
    // if we do not put the first(), then it will generate an error.

    // check if the element is visible
    // this element: .isVisible() does not have auto-waiting. That's why the previous line has to be written.
    const boolValue = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(boolValue).toBeTruthy();

    //await page.locator("button[type='button']").last().click();
    await page.locator("text=Checkout").click();

    // este delay hace que se escriba despacio en el campo
    // await page.locator("[placeholder*='Select Country']").fill("ind", {delay:100});
    await page.locator("[placeholder*='Select Country']").pressSequentially("ind");

    // next line selects the elements in the automatic dropdown.
    const dropdown = page.locator(".ta-results"); // 3 matches
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count(); // 3 options

    for(let i = 0; i < optionsCount; i++)
    {
        let text = await dropdown.locator("button").nth(i).textContent();
        if (text === " India")
        {
            // click on that option
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
    
    // this is to validate an email address.
    const email =  "edp@gmail.com";
    const writtenEmail = await page.locator(".user__name label").textContent();
    console.log("The email written is: " + writtenEmail);
    await expect(page.locator(".user__name label")).toHaveText(email);

    // this is to submit the order
    await page.locator(".action__submit").click();

    // verfies if the order was correctly placed.
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

    // this is to get the order number
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log("the order number is: " + orderId);

    // now on the top, we are going to click on the Orders tab
    await page.locator(".btn.btn-custom[routerlink='/dashboard/myorders']").click();

    // waits for the page to load all the orders present in the page.
    await page.locator("tbody").waitFor();

    // this will let us know how many lines of orders has been submitted.
    const rows = page.locator("tbody tr");

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
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();    


});
/*
test('Client App login - waitFor', async ({page}) => {

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("edp@gmail.com");
    await page.locator("#userPassword").fill("Nano1973!");
    await page.locator("[value='Login']").click();

    // with the next line, we force the page to wait until the DOM is loade with the textContent() method.
    // const firstTitle = await page.locator(".card-body b").first().textContent();
    // suppose I want to get all elements in the next page
    // If we use the allTextContents() method without the previous line, this will give us the [] empty array because this method does not wait 
    // until the object is attached to the DOM. const titles = await page.locator(".card-body b").allTextContents();

    // to wait until all the network calls have finished, we can ask playwright to wait using the waitForLoadState()

    // await page.waitForLoadState('networkidle');

    // then, this is suppossed to wait until all the calls are successfully made, then we will be able to get the allTextContents() method.
    await page.locator(".card-body b").first().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);


    });
*/