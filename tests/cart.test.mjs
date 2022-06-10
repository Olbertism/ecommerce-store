import { expect, test } from '@playwright/test';

const baseUrl = 'http://localhost:3000/';

test('cart page test', async ({ page }) => {
  // go to products page
  await page.goto(baseUrl + 'products');
  const titleLocator = page.locator('h1');
  await expect(titleLocator).toHaveId('products');

  // go to first product page, add product to cart
  await page.goto(baseUrl + 'products/1');
  const addToCartButtonLocator = page.locator(
    'data-test-id=product-add-to-cart',
  );
  await addToCartButtonLocator.click();
  // check the header counter
  const headerCounterLocator = page.locator('data-test-id=cart-count');
  await expect(headerCounterLocator).toHaveText('1');

  // add two more of the same
  const amountInputLocator = page.locator('data-test-id=product-quantity');
  await amountInputLocator.fill('2');
  await addToCartButtonLocator.click();
  await expect(headerCounterLocator).toHaveText('3');

  // click on cart link in header, verify we are in cart
  await page.locator('data-test-id=cart-link').click();
  await expect(page).toHaveURL(`${baseUrl}cart`);

  // check if amount is the same like in counter
  const cartItemAmountLocator = page.locator(
    'data-test-id=cart-product-quantity-1',
  );
  await expect(cartItemAmountLocator).toHaveValue('3');

  // navigate to remove button, hit remove
  const removeButtonLocator = page.locator(
    'data-test-id=cart-product-remove-1',
  );
  await removeButtonLocator.click();

  // check counter again
  await expect(headerCounterLocator).toHaveText('0');
});
