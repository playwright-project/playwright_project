const { test, expect } = require('@playwright/test');
const { URLs } = require('../Common/Urls');

test('Add a new Address in My Account', async ({ page }) => {
// Navigate to the Testing101 website
await page.goto(URLs.pageLinkHomePage);
await page.waitForTimeout(5000);
//Click on the Consent button on Cookie pop-up
await page.getByLabel('Consent', { exact: true }).click();
//Click on the Login button on the header
await page.getByRole('button', { name: 'Log In' }).click();
//Click on the Login button on the Signup page
await page.getByTestId('signUp.switchToSignUp').click();
//Input valid data into the Email field
await page.getByLabel('Email').fill('andriitest7799@gmail.com');
//Input valid data into the Password field
await page.getByLabel('Password').fill('Aa123_123');
//Click on the Login button of the Login form
await page.getByTestId('buttonElement').click();
// Assertion: Check if 'andriitest7799 account menu' is visible after login
await expect(page.getByLabel('andriitest7799 account menu')).toBeVisible();

//Click on Account menu on the Header
await page.getByLabel('andriitest7799 account menu').click();
//Click on My Addresses In the Navigation menu
await page.getByRole('link', { name: 'My Addresses' }).click();
//Click on New Address button
await page.frameLocator('iframe[title="My Addresses"]').getByRole('button', { name: 'Add New Address' }).click();

//Start interaction with the iframe
const frame = await page.frameLocator('//html/body/div[1]/div/div[5]/iframe');
//Fill in First Name field
await frame.getByLabel('First name').fill('Testing');
//Fill in Last Name field
await frame.getByLabel('Last name').fill('101');
//Fill in Company Name Field
await frame.getByLabel('Company name').fill('Testing101');
//Fill in Address field
await frame.getByLabel('Address', { exact: true }).fill('Ukraine, Lviv');
//Fill in Address line 2 field
await frame.getByPlaceholder('Apartment, suite, floor').fill('101');
//Fill in Address City
await frame.getByLabel('City').fill('Lviv');
//Open the Country Drop-down menu
await frame.getByRole('img').nth(1).click();
await page.waitForTimeout(3000);
//Choose Option on Drop-down menu
await frame.getByText('Ukraine').click();
//Fill in Zip code/Postal Code field
await frame.getByLabel('Zip / Postal code').fill('10001');
//Fill in Phone 
await frame.getByLabel('Phone').fill('+1234567890');
//Click on Add Address button
await frame.getByLabel('Add Address and close dialog').click();

//Assertion 
const addressLocator = page.frameLocator('iframe[title="My Addresses"]')
    .locator('address[data-hook="formatted-address"]');

await expect(addressLocator).toHaveText(`
    Testing 10101
    Testing101
    Ukraine, Lviv, 101
    Lviv,  10001
    Ukraine
    +1234567890
`);
});
