const { test, expect } = require('@playwright/test');
const { URLs } = require('../Common/Urls');

test('End-to-End Purchase Flow for a Single Product', async ({ page }) => {
  test.setTimeout(50000);
// Navigate to the Testing101 website
await page.goto(URLs.pageLinkCategoryAllProducts);
await page.waitForTimeout(5000);
//Click on the Consent button on Cookie pop-up
await page.getByLabel('Consent', { exact: true }).click();

//Click on the Sorting option of the Filter tab
await page.getByRole('link', { name: 'Sorting' }).click();
await page.waitForTimeout(5000);
//Click on the Add To Cart button on the Americano product
await page.getByLabel('Americano gallery').getByLabel('Add to Cart').click();
//Click on the View Cart button on the Cart sidebar
await page.frameLocator('xpath=/html/body/div[1]/div/div[4]/iframe').getByRole('link', { name: 'View Cart' }).click();
//Cart Assertion
await expect(page.locator('h3[data-hook="EmptyState.title"]')).not.toBeVisible();
//Click on the Checkout button on the My Cart page
await page.getByRole('button', { name: 'Checkout' }).click();
await page.waitForTimeout(5000);

//Checkout step 1
await page.getByLabel('Email').fill('your-email@example.com');
await page.getByLabel('First name').fill('John');
await page.getByLabel('Last Name').fill('Doe');
await page.getByLabel('Phone').fill('123-456-7890');
await page.getByLabel('Country/Region*').click();
await page.getByText('Ukraine').click();
await page.getByLabel('Address*').fill('123 Main Street');
await page.getByLabel('City').fill('Kyiv');
await page.getByLabel('Zip / Postal code').fill('01001');
await page.getByRole('button', { name: 'Continue' }).click();
//Checkout step 2
await page.getByRole('button', { name: 'Continue' }).click();
//Checkout step 3
await page.getByRole('button', { name: 'Place Order & Pay' }).click();
await page.waitForTimeout(5000);
//Assertion
await expect(
  page.locator('div').filter({ hasText: /^You\'ll receive a confirmation email soon\.$/ })
).toBeVisible({
  message: 'Error: Purchase confirmation message was not displayed.'
});
});
