const {test, expect} = require('@playwright/test');

let valor = 0;

test.describe.configure({ mode: 'serial' });
test('primera parte', async ({page}) => {

    const products = page.locator(".card-body");
    const productName = "ZARA COAT 3";

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("edp@gmail.com");
    await page.locator("#userPassword").fill("Nano1973!");
    await page.locator("[value='Login']").click();

    valor = 5;
    console.log(valor);

   

});

test('segunda parte', async ({page}) => {

    console.log('este es el segundo test');
    valor = valor + 3
    console.log(valor);
});

test('tercera parte', async ({page}) => {

    console.log('tercer test');
    valor = valor + 5;
    console.log(valor);
});

