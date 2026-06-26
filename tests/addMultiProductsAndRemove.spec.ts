import { test, expect, Locator } from '@playwright/test';

test('Add a product to cart and remove them', { tag: ["@bs2"] }, async ({ page, context }) => {
  // Save HAR as removeTheProductsInCart.har (matches test file name)
  await context.tracing.startHar('removeTheProductsInCart.har');
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

  const product1AddToCartButton = page.locator("//p[text()='iPhone 12 Mini']/following-sibling::div[text()='Add to cart']");
  await product1AddToCartButton.click();

  const product2AddToCartButton = page.locator("//p[text()='iPhone 12']/following-sibling::div[text()='Add to cart']");
  await product2AddToCartButton.click();

  const cartCounter = page.locator(".bag").locator(".bag__quantity").first();
  await expect(cartCounter).toHaveText("2");
  const cartCounterNumber = await cartCounter.textContent();
  console.log("cartCounterNumber :: " + cartCounterNumber);
  expect(cartCounterNumber).toBe("2");
  await page.locator('div.shelf-item__del').first().click();
  await page.locator('div.shelf-item__del').first().click();

  await expect(cartCounter).toHaveText("0");
  await expect(await page.locator('p.shelf-empty').textContent()).toBe("Add some products in the bag :)");
  await context.tracing.stopHar();
});