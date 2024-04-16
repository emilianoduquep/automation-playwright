const { test, expect } = require('@playwright/test');

test('Popup Validations', async ({page}) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    // handle a Popup dialog like alert form java
    page.on('dialog', dialog => dialog.accept()); // also can write a method for rejected
    await page.locator("#confirmbtn").click();

    // how to Hover an element
    await page.locator("#mousehover").hover();


    //iFRAMES
    // embeded iFrames inside a web page
    // the goal is to switch to the iFrame and from there you can work on it
    const framesPage = page.frameLocator("#courses-iframe");

    //In this case, the :visible is used, because it lacated 3 elements, but only one of them was visible.
    await framesPage.locator("a[href*='lifetime-access']:visible").click();// only visible elements
    const titleFrame = await framesPage.locator(".text h2").textContent();
    console.log(titleFrame.split(" ")[1]);




});