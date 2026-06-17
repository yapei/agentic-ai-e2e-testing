// spec: specs/saucedemo-checkout-test-plan.md
import { test, expect } from '@playwright/test';
import {
  login,
  addItemsToCart,
  goToCart,
  DEFAULT_ITEMS,
} from './checkout.helpers';

test.describe('AC1: Cart Review', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('TC-001: Verify Cart Displays All Items with Correct Details', async ({ page }) => {
    await addItemsToCart(page, DEFAULT_ITEMS);
    await goToCart(page);

    await expect(page.locator('.cart_item')).toHaveCount(3);
    await expect(page.locator('.inventory_item_name')).toHaveText([
      'Sauce Labs Backpack',
      'Sauce Labs Bike Light',
      'Sauce Labs Bolt T-Shirt',
    ]);
    await expect(page.locator('.inventory_item_price')).toHaveText([
      '$29.99',
      '$9.99',
      '$15.99',
    ]);
    await expect(page.locator('.cart_quantity')).toHaveText(['1', '1', '1']);
  });

  test('TC-002: Verify Continue Shopping and Checkout Buttons Present', async ({ page }) => {
    await addItemsToCart(page, ['sauce-labs-backpack']);
    await goToCart(page);

    await expect(page.locator('[data-test="continue-shopping"]')).toBeVisible();
    await expect(page.locator('[data-test="checkout"]')).toBeVisible();

    await page.locator('[data-test="continue-shopping"]').click();
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('TC-003: Verify Empty Cart Message', async ({ page }) => {
    await goToCart(page);

    await expect(page.locator('.cart_item')).toHaveCount(0);
    await expect(page.locator('[data-test="continue-shopping"]')).toBeVisible();
    await expect(page.locator('[data-test="checkout"]')).toBeVisible();
  });
});
