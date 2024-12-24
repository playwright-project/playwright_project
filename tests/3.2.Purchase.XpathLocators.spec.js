import {test,expect} from '@playwright/test';
import { URLs } from '../Common/Urls';
import {consentPopup} from '../Common/ConsentPopup';
import { pagePLP } from '../PageObjects/PagePLP';
import { pageCartPage } from '../PageObjects/PageCartPage';
import { pageCheckout } from '../PageObjects/PageCheckout';
import { testData } from '../Common/TestData';

test('End to End Purchase flow with the XPath locators', async ({ page }) => {
  test.setTimeout(50000);
// Navigate to the Testing101 website
await page.goto(URLs.pageLinkCategoryAllProducts);
await page.waitForTimeout(5000);
const consentPopupWindow = new consentPopup(page);
await consentPopupWindow.clickManageOptions();
const plpPage = new pagePLP(page);
//Click on the Sorting option of the Filter tab
const buttonSorting = page.locator(plpPage.buttonSorting);
await buttonSorting.click();
await page.waitForTimeout(5000);
//Click on the Add To Cart button on the Americano product
const buttonAddToCartPLP = page.locator(plpPage.buttonAddToCartPLP);
await buttonAddToCartPLP.waitFor();
await buttonAddToCartPLP.click();
// // Start interacting with the iframe
const cartPage = new pageCartPage(page);
const iframeMinicart = page.frameLocator(cartPage.iframeMinicart);
const buttonViewCart = iframeMinicart.locator(cartPage.buttonViewCart);
await buttonViewCart.waitFor();
await buttonViewCart.click();
//Cart Assertion
const assertionEmptyCart = page.locator(cartPage.assertionEmptyCart);
await expect(assertionEmptyCart).not.toBeVisible();
//Click on the Checkout button on the My Cart page
const buttonCheckout = page.locator(cartPage.buttonCheckout);
await buttonCheckout.waitFor();
await buttonCheckout.click();
//Checkout step 1
const checkoutPage = new pageCheckout(page);
const fieldEmail = page.locator(checkoutPage.fieldEmail);
await fieldEmail.fill(testData.checkoutCustomerDetails.email);
const fieldFirstName = page.locator(checkoutPage.fieldFirstName);
await fieldFirstName.fill(testData.checkoutCustomerDetails.firstName);
const fieldLastName = page.locator(checkoutPage.fieldLastName);
await fieldLastName.fill(testData.checkoutCustomerDetails.lastName);
const fieldPhone = page.locator(checkoutPage.fieldPhone);
await fieldPhone.fill(testData.checkoutCustomerDetails.phone);
const dropdownCountryRegion = page.locator(checkoutPage.dropdownCountryRegion);
await dropdownCountryRegion.click();
const dropdownOption = page.locator(checkoutPage.dropdownOption);
await dropdownOption.click();
const fieldAddress = page.locator(checkoutPage.fieldAddress);
await fieldAddress.fill(testData.checkoutDeliveryDetails.address);
const fieldCity = page.locator(checkoutPage.fieldCity);
await fieldCity.fill(testData.checkoutDeliveryDetails.city);
const fieldZipCode = page.locator(checkoutPage.fieldZipCode);
await fieldZipCode.fill(testData.checkoutDeliveryDetails.zipCode);
const buttonContinueCheckout1 = page.locator(checkoutPage.buttonContinueCheckout1);
await buttonContinueCheckout1.click();
//Checkout step 2
const buttonContinueCheckout2 = page.locator(checkoutPage.buttonContinueCheckout2);
await buttonContinueCheckout2.click();
//Checkout step 3
const buttonPlaceOrder = page.locator(checkoutPage.buttonPlaceOrder);
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



