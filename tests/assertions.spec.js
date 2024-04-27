const { test, expect } = require('@playwright/test');

test('name', async ({page}) => {

    let position;

    await page.goto('https://www.colombia.com/cine/royal-films-acqua-ibague-s247');
    const nombrePelicula = await page.locator(".nombre-pelicula").allTextContents();

    await expect(page.locator(".caja-cinema").first()).toBeVisible();

    const containerMovies = await page.locator(".caja-cinema").allTextContents();
    
    for(let i = 0; i < nombrePelicula.length; i++){
        if(nombrePelicula[i] === 'KUNG FU PANDA 4'){
            const horarios = await page.locator(".horarios-funcion").allTextContents();
            console.log(`KUNG FU PANDA 4 at ${horarios[i]}`);
            position = i;
            break;
        }
        i++;
    }

});

test('verify hidden', async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    await page.locator("#show-textbox").scrollIntoViewIfNeeded();
    await page.locator("#show-textbox").click();
    const locatorBox = await page.locator("#displayed-text");
    await expect(locatorBox).toBeVisible();
    await page.locator("#hide-textbox").scrollIntoViewIfNeeded();
    await page.locator("#hide-textbox").click();
    await expect(locatorBox).toBeHidden();

    // cheching the hover function
    await page.locator("button[id='mousehover']").hover();
    await page.locator("a[href='#top']").click();
    await page.pause();

});

test.only('Hover', async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    // cheching the hover function
    await page.locator("button[id='mousehover']").hover();
    await page.locator("a[href='#top']").click();


});