// spec: specs/saucedemo-checkout-test-plan.md
import { test, expect } from '@playwright/test';
import {
  login,
  addItemsToCart,
  startCheckout,
  fillCheckoutInfo,
  proceedToOverview,
  goToCart,
  DEFAULT_ITEMS,
} from './checkout.helpers';

test.describe('AC3: Order Overview', () => {
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
  });

  test('TC-010: Verify Order Overview Page Content', async ({ page }) => {
    await expect(page.locator('.cart_item')).toHaveCount(3);
    await expect(page.locator('[data-test="payment-info-label"]')).toBeVisible();
    await expect(page.locator('[data-test="shipping-info-label"]')).toBeVisible();
    await expect(page.locator('.summary_subtotal_label')).toContainText('55.97');
    await expect(page.locator('.summary_tax_label')).toBeVisible();
    await expect(page.locator('.summary_total_label')).toBeVisible();
  });

  test('TC-011: Verify Cancel Button on Order Overview', async ({ page }) => {
    await expect(page.locator('[data-test="cancel"]')).toBeVisible();
    await page.locator('[data-test="cancel"]').click();

    // Cancel on overview returns to products page; cart items are preserved
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('3');
  });

  test('TC-012: Verify Finish Button on Order Overview', async ({ page }) => {
    await expect(page.locator('[data-test="finish"]')).toBeVisible();
    await page.locator('[data-test="finish"]').click();
    await expect(page).toHaveURL(/checkout-complete\.html/);
  });
});
