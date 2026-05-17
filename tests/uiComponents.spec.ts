import { test, expect } from '@playwright/test';


test.beforeEach(async ({ page }) => {
    page.goto('http://localhost:4200/')
})

test.describe('Form Layout', async () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText("Forms").click();
        await page.getByText('Form Layouts').click();
    })

    test('input fields', async ({ page }) => {
        const usingTheGridEmailInput = page.locator('nb-card', { hasText: 'Using the Grid' }).getByRole('textbox', { name: 'Email' });

        await usingTheGridEmailInput.fill('sudan25092007@gmail.com');

        await usingTheGridEmailInput.clear();
        await usingTheGridEmailInput.pressSequentially('sudan25092007@gmail.com', { delay: 500 })

        const inputValue = await usingTheGridEmailInput.inputValue();
        expect(inputValue).toEqual('sudan25092007@gmail.com')

        await expect(usingTheGridEmailInput).toHaveValue('sudan25092007@gmail.com')
    })

    test('radio buttons', async ({ page }) => {
        const usingRadioButton = page.locator('nb-card', { hasText: 'Using the Grid' })
        // usingRadioButton.getByLabel('Option 1').click({force: true})
        await usingRadioButton.getByRole('radio', { name: 'Option 1' }).check({ force: true })

        //Generic Assertion
        const radioStatus = await usingRadioButton.getByRole('radio', { name: 'Option 1' }).isChecked()
        expect(radioStatus).toBeTruthy()
        // Locator Assertion
        await expect(usingRadioButton.getByRole('radio', { name: 'Option 1' })).toBeChecked()

        await usingRadioButton.getByRole('radio', { name: 'Option 2' }).check({ force: true })
        expect(await usingRadioButton.getByRole('radio', { name: 'Option 1' }).isChecked()).toBeFalsy()
        expect(await usingRadioButton.getByRole('radio', { name: 'Option 2' }).isChecked()).toBeTruthy()

    })
})

test('checkbox inputs', async ({ page }) => {
    await page.getByText("Modal & Overlays").click();
    await page.getByText('Toastr').click();

    await page.getByRole('checkbox', { name: 'Hide on Click' }).uncheck({ force: true })
    await page.getByRole('checkbox', { name: 'Prevent arising of duplicate toast' }).check({ force: true })

    const allBoxes = page.getByRole('checkbox')
    for (const box of await allBoxes.all()) {
        await box.uncheck({ force: true })
        expect(await box.isChecked()).toBeFalsy()
    }
})


test('theme', async ({ page }) => {
    const dropDown = page.locator('ngx-header nb-select')
    await dropDown.click()

    page.getByRole('list') //UL
    page.getByRole('listitem') //UI

    // const optionList = page.getByRole('list').locator('nb-option')
    const optionList = page.locator('nb-option-list nb-option')
    await expect(optionList).toHaveText(['Light', 'Dark', 'Cosmic', 'Corporate'])
    await optionList.filter({ hasText: 'Cosmic' }).click();

    const header = page.locator('nb-layout-header')
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')

    const colors =  {
        Light: "rgb(255, 255, 255)",
        Dark: 'rgb(34, 43, 69)',
        Cosmic: 'rgb(50, 50, 89)',
        Corporate: 'rgb(255, 255, 255)'
    }
    await dropDown.click()
    for(const color in colors) {
        await optionList.filter({hasText: color}).click()
        await expect(header).toHaveCSS('background-color', colors[color as keyof typeof colors])
        if(color != 'Corporate')
           await dropDown.click()
    }
})


test('tooltip', async({page})=> {
   await page.getByText("Modal & Overlays").click();
   await page.getByText('Tooltip').click();

   const toolTipCard = page.locator('nb-card', {hasText: 'Tooltip Placements'})
   await toolTipCard.getByRole('button', {name: 'Top'}).hover()

   page.getByRole('tooltip')
   const tooltip = await page.locator('nb-tooltip').textContent()
   expect(tooltip).toEqual('This is a tooltip')
})


test('dialog Box', async({page})=> {
    await page.getByText("Tables & Data").click();
    await page.getByText('Smart Table').click();

    page.on('dialog', dialog => {
        expect(dialog.message()).toEqual("Are you sure you want to delete?")
        dialog.accept()
    })

    await page.getByRole('table').locator('tr', {hasText: 'mdo@gmail.com'}).locator('.nb-trash').click()
    await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com')

})