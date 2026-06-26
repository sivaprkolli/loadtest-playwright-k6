import { test, expect, Locator } from '@playwright/test';

test('Add a product to cart and checkout', { tag: ["@bs1"] }, async ({ page, context }) => {
  // Save HAR as addProductAndCheckout.har (matches test file name)
  await context.tracing.startHar('addProductAndCheckout.har');
  await page.goto('https://bugbash.online/');

  const signInButton = page.getByRole('link', { name: 'Sign In' });
  await signInButton.click();

  const emailInput = page.getByText('Select Username');
  await emailInput.click();
  await page.locator(`xpath=//*[text()="demouser"]`).click();

  const passwordInput = page.getByText('Select Password');
  await passwordInput.click();
  await page.locator(`xpath=//*[text()="testingisfun99"]`).click();

  const submitButton = page.getByRole('button', { name: 'Log In' });
  await submitButton.click();

  const userprofile = page.locator(".username");
  console.log("userprofile :: " + await userprofile.textContent());
  expect(await userprofile.textContent()).toBe("demouser");

  const productAddToCartButton = page.locator("//p[text()='iPhone 12 Mini']/following-sibling::div[text()='Add to cart']");
  await productAddToCartButton.click();

  const cartCounter = page.locator(".bag").locator(".bag__quantity").first();
  await expect(cartCounter).toHaveText("1");
  const cartCounterNumber = await cartCounter.textContent();
  console.log("cartCounterNumber :: " + cartCounterNumber);
  expect(cartCounterNumber).toBe("1");
  const checkoutButton = page.locator('.buy-btn');
  await expect(checkoutButton).toBeVisible();
  await checkoutButton.click();

  const firstNameInput = page.locator("#firstNameInput");
  await expect(firstNameInput).toBeVisible();
  await firstNameInput.fill("Siva");

  const lastNameInput = page.locator("#lastNameInput");
  await expect(lastNameInput).toBeVisible();
  await lastNameInput.fill("Reddy");

  const addressInput = page.locator("#addressLine1Input");
  await addressInput.fill("123 Main St");

  const stateInput = page.locator("#provinceInput");
  await stateInput.fill("Hyderabad");

  const postalCodeInput = page.locator("#postCodeInput");
  await postalCodeInput.fill("500001");
  await page.getByRole("button", { name: "Submit" }).click();
  await context.tracing.stopHar();
});