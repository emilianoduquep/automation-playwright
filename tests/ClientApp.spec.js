const {test, expect} = require('@playwright/test');

test('Client App login - waitForLoadState', async ({page}) => {

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

    await page.waitForLoadState('networkidle');

    // then, this is suppossed to wait until all the calls are successfully made, then we will be able to get the allTextContents() method.
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);


    });

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
