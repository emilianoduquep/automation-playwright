const {test, expect} = require('@playwright/test');

test.only('Page - Playwright test', async ({page}) => {

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill()


    });