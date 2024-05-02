const { test, expect } = require('@playwright/test');

test('Radio buttons', async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.locator("input[value='radio2']").check();
    await expect(page.locator("input[value='radio2']")).toBeChecked();
    // await page.pause();

});

test('auto complete', async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.locator("#autocomplete").pressSequentially('co', {delay: 100});

    // TODO
    
    const dropdown = page.locator("ul[id='ui-id-1']"); // 3 matches
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("li").count(); // 3 options

    for(let i = 0; i < optionsCount; i++)
    {
        let text = await dropdown.locator("li").nth(i).textContent();
        if (text === "Colombia")
        {
            // click on that option
            await dropdown.locator("li").nth(i).click();
            break;
        }
    }

    const textLocator = page.locator("input[id='autocomplete']");

    await expect(textLocator).toHaveValue("Colombia"); // muy util cuando estoy evaluando el valor de un input

})

test('dropDown', async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.locator("#dropdown-class-example").selectOption('Option2');
    await expect(page.locator("#dropdown-class-example")).toHaveValue('option2');
});

test('CheckBox', async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.locator("#checkBoxOption1").check();
    await page.locator("#checkBoxOption3").check();
    await expect(page.locator("#checkBoxOption1")).toBeChecked();
    await expect(page.locator("#checkBoxOption2")).not.toBeChecked(); // expected to fail
    await expect(page.locator("#checkBoxOption3")).toBeChecked();

});

test('Pop up new window', async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    
    // esta parte hace que las dos promesas internas se cumplan y guardamos en le array newPage el primer resultado de las promesas.
    const [newPage] = await Promise.all([
        page.waitForEvent('popup'),
        await page.locator("#openwindow").click()
    ]);

    // esperamos a que la nueva pagina se cargue completamente
    await newPage.waitForLoadState()

    // se hace un assertion para verificar que abrio correctamente
    await expect(newPage).toHaveTitle('QAClick Academy - A Testing Academy to Learn, Earn and Shine');

    // cerramos la nueva ventana
    await newPage.close();
});

test('Pop up new Tab', async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    
    // esta parte hace que las dos promesas internas se cumplan y guardamos en le array newPage el primer resultado de las promesas.
    const [newTab] = await Promise.all([
        page.waitForEvent('popup'),
        await page.locator("#opentab").click()
    ]);

    // esperamos a que la nueva pagina se cargue completamente
    await newTab.waitForLoadState()

    // se hace un assertion para verificar que abrio correctamente
    await expect(newTab).toHaveTitle('QAClick Academy - A Testing Academy to Learn, Earn and Shine');

    // cerramos la nueva ventana
    await newTab.close();
});

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

test('Hover', async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    // cheching the hover function
    await page.locator("button[id='mousehover']").hover();
    await page.locator("a[href='#top']").click();
    // note: this will cause an error, but we are using expect.soft then it will fail but the next line will be excected
    await expect.soft("button[id='mousehover']").toBeHidden();
    console.log('this is printed after the error');

});



