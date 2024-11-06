const { test, expect } = require('@playwright/test');
const { URLs } = require('../Common/Urls');

test('Login with valid credentials', async ({ page }) => {
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
});


test('Login with empty fields of the Login form', async ({ page }) => {
// Navigate to the Testing101 website
await page.goto(URLs.pageLinkHomePage);
await page.waitForTimeout(5000);
//Click on the Consent button on Cookie pop-up
await page.getByLabel('Consent', { exact: true }).click();
//Click on the Login button on the header
await page.getByRole('button', { name: 'Log In' }).click();
//Click on the Login button on the Signup page
await page.getByTestId('signUp.switchToSignUp').click();
//Click on the Login button of the Login form
await page.getByTestId('buttonElement').click();

//Assertion to check error message of the Email field
await expect(page.locator('#siteMembersInputErrorMessage_emailInput_SM_ROOT_COMP788')).toHaveText('Email cannot be blank');
//Assertion to check error message of the Password field
await expect(page.locator('#siteMembersInputErrorMessage_passwordInput_SM_ROOT_COMP788')).toHaveText('Make sure you enter a password.');
});


test('Login with empty Email field of the Login form', async ({ page }) => {
// Navigate to the Testing101 website
await page.goto(URLs.pageLinkHomePage);
await page.waitForTimeout(5000);
//Click on the Consent button on Cookie pop-up
await page.getByLabel('Consent', { exact: true }).click();
//Click on the Login button on the header
await page.getByRole('button', { name: 'Log In' }).click();
//Click on the Login button on the Signup page
await page.getByTestId('signUp.switchToSignUp').click();
//Input valid data into the Password field
await page.getByLabel('Password').fill('Aa123_123');
//Click on the Login button of the Login form
await page.getByTestId('buttonElement').click();

//Assertion to check error message of the Email field
await expect(page.locator('#siteMembersInputErrorMessage_emailInput_SM_ROOT_COMP788')).toHaveText('Email cannot be blank');
});


test('Login with empty Password field of the Login form', async ({ page }) => {
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
//Click on the Login button of the Login form
await page.getByTestId('buttonElement').click();

//Assertion to check error message of the Password field
await expect(page.locator('#siteMembersInputErrorMessage_passwordInput_SM_ROOT_COMP788')).toHaveText('Make sure you enter a password.');
});


test('Log in with the Invalid format of Email', async ({ page }) => {
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
await page.getByLabel('Email').fill('andriitest7799%gmail.com');
//Input valid data into the Password field
await page.getByLabel('Password').fill('Aa123_123');
//Click on the Login button of the Login form
await page.getByTestId('buttonElement').click();

// //Assertion to check error message of the Email field
await expect(page.locator('#siteMembersInputErrorMessage_emailInput_SM_ROOT_COMP788')).toHaveText('Double check your email and try again.');
});


test('Log in with the Invalid Password', async ({ page }) => {
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
await page.getByLabel('Password').fill('Aa123_1');
//Click on the Login button of the Login form
await page.getByTestId('buttonElement').click();

// //Assertion to check error message of the Password field
await expect(page.locator('#siteMembersInputErrorMessage_passwordInput_SM_ROOT_COMP788')).toHaveText('Wrong email or password');
});


test('Log in with a non-existent user email', async ({ page }) => {
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
await page.getByLabel('Email').fill('andriitest12345@gmail.com');
//Input valid data into the Password field
await page.getByLabel('Password').fill('Aa123_123');
//Click on the Login button of the Login form
await page.getByTestId('buttonElement').click();

// //Assertion to check a non-existent user email error message
await expect(page.locator('#siteMembersInputErrorMessage_passwordInput_SM_ROOT_COMP788')).toHaveText("This email doesn't match any account. Try again.");
});
