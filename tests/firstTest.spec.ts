import { expect, test } from '@playwright/test'



test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
    await page.getByText("Forms").click();
    await page.getByText('Form Layouts').click();

})

test("Locator syntax rules", async ({ page }) => {
    await page.locator('input').first().click();
    await page.locator ('#inputEmail')
    await page.locator('.shape-rectangle')
    await page.locator('input[placeholder="Email"]')
    await page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')
    await page.locator('//*[@id="inputEmail"]')
    await page.locator(':text("Using")')
    await page.locator(':text-is("Using the Grid")')
})

test("User facing Locators", async ({ page }) => {
    await page.getByRole('textbox', {name: 'Email'}).first().click();
    await page.getByRole('button', {name: 'Sign in'}).first().click();
    await page.getByLabel('Email').first().click();
    await page.getByPlaceholder('Jane Doe').click();
    await page.getByText('Using the Grid').click();
    await page.getByTestId('sudan').click();
    await page.getByTitle('IoT Dashboard').click();
})

test('Locating Child Elements', async ({page}) => {
    await page.locator('nb-card nb-radio :text("Option 1")').click();
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click();
    await page.locator('nb-card').getByRole('button', {name: 'Sign in'}).first().click();
    await page.locator('nb-card').nth(3).getByRole('button').click();
}) 

test('Locating Parent Elements', async ({page})=> {
    await page.locator('nb-card', {hasText: 'Using the Grid'}).getByRole('textbox', {name: 'Email'}).click();
    await page.locator('nb-card', {has: page.locator('#inputEmail')}).getByRole('textbox', {name: 'Email'}).click();
    await page.locator('nb-card').filter({hasText: 'Basic form'}).getByRole('textbox', {name: 'Email'}).click();
    await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox', {name: 'Password'}).click();
    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in"}).getByRole('textbox', {name: 'Email'}).click();
    await page.locator(':text("Using the Grid")').locator('..').getByRole('textbox', {name: 'Email'}).click();
})  


test('Reusing Locators',async ({page})=> {
    const grid = page.locator('nb-card').filter({hasText: 'Basic form'});
    const email = grid.getByRole('textbox', {name: 'Email'});
    const password = grid.getByRole('textbox', {name: 'Password'});
    await email.fill('sudan25092007@gmail.com');
    await password.fill('Sudan2508');
    await grid.locator('nb-checkbox').click();
    await grid.getByRole('button', {name: 'Submit'}).click();

    await expect(email).toHaveValue('sudan25092007@gmail.com');
    await expect(password).toHaveValue('Sudan2508');
})


test('Extracting Values', async ({page}) => {
    const basicForm = page.locator('nb-card').filter({hasText: 'Basic form'});
    const buttonText = await basicForm.locator('button').textContent();
    expect(buttonText).toEqual('Submit')
    console.log(buttonText)
 
    const allRadioButtons = await page.locator('nb-radio').allTextContents();
    expect(allRadioButtons).toEqual(["Option 1", "Option 2","Disabled Option"]);
    
    const email = basicForm.getByRole('textbox', {name: 'Email'});
    await email.fill("sudan25092007@gmail.com");
    const emailValue = await email.inputValue();
    expect(emailValue).toEqual('sudan25092007@gmail.com');
    console.log(emailValue);

    const placeholder = await email.getAttribute('placeholder');
    expect(placeholder).toEqual('Email');
 
})


test('assertions', async({page})=> {
    const basicForm = page.locator('nb-card').filter({hasText: 'Basic form'}).locator('button');

    const text = await basicForm.textContent();

    expect(text).toEqual('Submit');

    await expect(basicForm).toHaveText('Submit');

    await expect.soft(basicForm).toHaveText('Submit2');

    await basicForm.click();
})