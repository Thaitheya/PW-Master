import {test} from '@playwright/test'

test.beforeEach(async({page}) => {
    await page.goto("https://www.amazon.in/");
    
})

test('Amazon Login', async ({page})=> {
    await page.getByText('Hello, sign in').click();
    await page.getByRole('textbox', {name: 'Enter mobile number or email'}).fill('sudan25092007@gmail.com');
    await page.getByRole('button', {name: 'Continue'}).click();
    await page.getByRole('textbox', {name: 'Password'}).fill('Sudan@2805');
    await page.getByRole('button', {name: 'Sign in', exact: true }).click();
    await page.getByRole('textbox', {name: 'Enter OTP'}).waitFor({state: 'visible'});
    await page.getByRole('checkbox', {name: 'Don’t ask for codes on this device'}).click();
    await page.pause();
    await page.getByRole('button', {name: 'Sign in'}).click();

    await page.locator('#twotabsearchtextbox').fill('mouse');
    await page.locator('#nav-search-submit-button').click();
    await page.getByRole('checkbox', {name: 'HP', exact: true}).click();

})