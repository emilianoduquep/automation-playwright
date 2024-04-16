import { test, expect } from '@playwright/test';

test('Play wright special locators', async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/angularpractice/");

    // getByLabel()
    // este trabaja muy bien si la accion esta asociada con el label. Cuando al hacer click en el label, el boton se seleccionaa
    // muy bueno en checkbox o en options
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");

    // getByPlaceholder()
    await page.getByPlaceholder("Password").fill("hola");

    // getByRole() 
    await page.getByRole("button", {name: 'Submit'}).click();

    // getByText()
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();

    await page.getByRole("link", {name: "Shop"}).click();
    await page.locator("app-card").filter({hasText: "Nokia Edge"}).getByRole("button");


    // await page.pause();
});

/*
    note:
    this very usefull with this command to have a runner 
    npx playwright test --ui
*/