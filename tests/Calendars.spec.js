// https://rahulshettyacademy.com/seleniumPractise/#/offers

const { test, expect } = require('@playwright/test');

test('Calendar validations',async ({page}) =>{

    const month = "6";
    const day = "12";
    const year = "2027";
    const expectedList = [month, day, year];


    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup__year").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months button").nth(month - 1).click();
    await page.locator("//abbr[text()='"+day+"']").click();

    const inputs = await page.locator(".react-calendar__navigation__label");
    for (let i = 0; i < inputs.length; i++) {

        const value = inputs[i].getAttribute("value");
        expect(value).toEqual(expectedList[i]);
    }
});