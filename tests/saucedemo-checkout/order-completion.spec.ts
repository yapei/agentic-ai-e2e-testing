// spec: specs/saucedemo-checkout-test-plan.md
import { test, expect } from '@playwright/test';
import {
  login,
  addItemsToCart,
  startCheckout,
  fillCheckoutInfo,
  proceedToOverview,
  completeOrder,
  goToCart,
  DEFAULT_ITEMS,
} from './checkout.helpers';

test.describe('AC4: Order Completion', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await addItemsToCart(page, DEFAULT_ITEMS);
    await startCheckout(page);
    await fillCheckoutInfo(page, {
      firstName: 'John',
      lastName: 'Doe',
      postalCode: '12345',
    });
    await proceedToOverview(page);
    await completeOrder(page);
  });

  test('TC-013: Successful Order Completion - Confirmation Page', async ({ page }) => {
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
    await expect(page.locator('.complete-text')).toContainText('Your order has been dispatched');
    await expect(page.locator('[data-test="back-to-products"]')).toBeVisible();
  });

  test('TC-014: Navigate Back Home from Order Confirmation', async ({ page }) => {
    await page.locator('[data-test="back-to-products"]').click();
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.locator('.inventory_item')).toHaveCount(6);
  });

  test('TC-015: Verify Cart Cleared After Order', async ({ page }) => {
    await page.locator('[data-test="back-to-products"]').click();
    await goToCart(page);
    await expect(page.locator('.cart_item')).toHaveCount(0);
  });
});
