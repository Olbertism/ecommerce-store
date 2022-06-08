import { expect, test } from '@playwright/test';

const baseUrl = 'http://localhost:3000/';

test('cart page test', async ({ page }) => {
  // go to first product page, add product to cart
  await page.goto(baseUrl + 'products/1');
  const addToCartButtonLocator = page.locator(
    'data-test-id=product-add-to-cart',
  );
  await addToCartButtonLocator.click();

  // click on cart link in header, verify we are in cart, verify we have an item in the cart
  await page.locator('data-test-id=cart-link').click();
  await expect(page).toHaveURL(`${baseUrl}cart`);
  const cartItemAmountLocator = page.locator(
    'data-test-id=cart-product-quantity-1',
  );
  await expect(cartItemAmountLocator).toHaveValue('1');

  // go to the checkout page, fill out the form
  await page.locator('data-test-id=cart-checkout').click();
  await expect(page).toHaveURL(`${baseUrl}checkout`);

  await page.locator('data-test-id=checkout-first-name').fill('TEST');
  await page.locator('data-test-id=checkout-last-name').fill('TEST');
  await page.locator('data-test-id=checkout-email').fill('TEST');
  await page.locator('data-test-id=checkout-address').fill('TEST');
  await page.locator('data-test-id=checkout-city').fill('TEST');
  await page.locator('data-test-id=checkout-postal-code').fill('TEST');
  await page.locator('data-test-id=checkout-country').fill('TEST');
  await page.locator('data-test-id=checkout-credit-card').fill('TEST');
  await page.locator('data-test-id=checkout-expiration-date').fill('TEST');
  await page.locator('data-test-id=checkout-security-code').fill('TEST');

  const confirmButtonLocator = page.locator(
    'data-test-id=checkout-confirm-order',
  );
  await expect(confirmButtonLocator).toHaveText('Confirm Order');
  await confirmButtonLocator.click()

  // check if we are on the thankyou page
  await expect(page).toHaveURL(`${baseUrl}thankyou`);
});
