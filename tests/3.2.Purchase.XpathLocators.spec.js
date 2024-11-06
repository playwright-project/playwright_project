import {test,expect} from '@playwright/test';
import { URLs } from '../Common/Urls';

test.only('End to End Purchase flow with the XPath locators', async ({ page }) => {
  test.setTimeout(50000);
// Navigate to the Testing101 website
await page.goto(URLs.pageLinkCategoryAllProducts);
await page.waitForTimeout(5000);

//Click on the Consent button on Cookie pop-up
const buttonConsent = page.locator("xpath=//button[@aria-label='Consent']");
await buttonConsent.click();
//Click on the Sorting option of the Filter tab
const buttonSorting = page.locator("xpath=//span[text()='Sorting']");
await buttonSorting.click();
await page.waitForTimeout(5000);
//Click on the Add To Cart button on the Americano product
const buttonAddToCartPLP = page.locator("xpath=//div[@data-slug='americano']//span[text()='Add to Cart']");
await buttonAddToCartPLP.waitFor();
await buttonAddToCartPLP.click();
// // Start interacting with the iframe
const iframeMinicart = page.frameLocator('xpath=//iframe[contains(@class, "U73P_q")]');
const buttonViewCart = iframeMinicart.locator('xpath=//footer//span[text()="View Cart"]');
await buttonViewCart.waitFor();
await buttonViewCart.click();
//Cart Assertion
const assertionEmptyCart = page.locator('xpath=//h3[@data-hook="EmptyState.title"]');
await expect(assertionEmptyCart).not.toBeVisible();
//Click on the Checkout button on the My Cart page
const buttonCheckout = page.locator("xpath=//span[text()='Checkout']");
await buttonCheckout.waitFor();
await buttonCheckout.click();

//Checkout step 1
const fieldEmail = page.locator("xpath=//input[@aria-label='Email']");
await fieldEmail.fill('test@example.com');
const fieldFirstName = page.locator("xpath=//input[@aria-label='First name']");
await fieldFirstName.fill('Testing');
const fieldLastName = page.locator("xpath=//input[@aria-label='Last name']");
await fieldLastName.fill('101');
const fieldPhone = page.locator("xpath=//input[@aria-label='Phone']");
await fieldPhone.fill('123-456-7890');
const dropdownCountryRegion = page.locator("xpath=//div[@data-hook='form-field-country']");
await dropdownCountryRegion.click();
const dropdownOption = page.locator("xpath=//div[text()='Ukraine']");
await dropdownOption.click();
const fieldAddress = page.locator("xpath=//div[@data-hook='form-field-address_line']//input[@role='combobox']");
await fieldAddress.fill('1234 Example Street');
const fieldCity = page.locator("xpath=//input[@aria-label='City']");
await fieldCity.fill('Lviv');
const fieldZipCode = page.locator("xpath=//input[@aria-label='Zip / Postal code']");
await fieldZipCode.fill('12345');
const buttonContinueCheckout1 = page.locator("xpath=//span[text()='Continue']");
await buttonContinueCheckout1.click();
//Checkout step 2
const buttonContinueCheckout2 = page.locator("xpath=//span[text()='Continue']");
await buttonContinueCheckout2.click();
//Checkout step 3
const buttonPlaceOrder = page.locator("xpath=//span[text()='Place Order & Pay']");
await buttonPlaceOrder.waitFor();
await buttonPlaceOrder.click();
await page.waitForTimeout(5000);

//Assertion
await expect(
page.locator('xpath=//span[text()="You\'ll receive a confirmation email soon."]')
).toBeVisible({
  message: 'Error: Purchase confirmation message was not displayed.'
});
});



