import { test } from '@playwright/test';


test('login', async ({page})=> {
    await page.goto("https://google.com");
    console.log("Google opened successfully");
})