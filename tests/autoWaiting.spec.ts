import {expect, test} from '@playwright/test'

test.beforeEach(async ({ page }, testInfo) => {
    await page.goto('http://www.uitestingplayground.com/ajax')
    await page.getByText('Button Triggering AJAX Request').click();
    testInfo.setTimeout(testInfo.timeout + 2000);
})


test('auto waiting', async({page})=> {
    const successButton = page.locator('.bg-success');
    await successButton.waitFor({state:'attached'});
    const text = await successButton.allTextContents();
    expect(text).toContain('Data loaded with AJAX get request.')

    await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout: 20000})
})

test('alternative waits', async({page})=> {
    const successButton = page.locator('.bg-success');
    
    // await page.waitForSelector('.bg-success');
    
    // await page.waitForResponse('http://www.uitestingplayground.com/ajaxdata');
    
    await page.waitForLoadState('networkidle');

    
    const text = await successButton.allTextContents();
    expect(text).toContain('Data loaded with AJAX get request.');
})


test('timeouts', async ({page})=> {
    // test.setTimeout(10000);
    // test.slow();
    const successButton = page.locator('.bg-success');
    await successButton.click();
})