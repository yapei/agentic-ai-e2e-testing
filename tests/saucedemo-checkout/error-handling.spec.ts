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

test.describe('AC5: Error Handling & Additional Cases', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await addItemsToCart(page, DEFAULT_ITEMS);
  });

  test('TC-016: Invalid Characters in Zip Code', async ({ page }) => {
    await startCheckout(page);
    await fillCheckoutInfo(page, {
      firstName: 'John',
      lastName: 'Doe',
      postalCode: 'ABCDE',
    });
    await proceedToOverview(page);
    await expect(page).toHaveURL(/checkout-step-two\.html/);
  });

  test('TC-017: Very Long Input in Name Fields', async ({ page }) => {
    const longName = 'A'.repeat(100);
    await startCheckout(page);
    await fillCheckoutInfo(page, {
      firstName: longName,
      lastName: longName,
      postalCode: '99999',
    });
    await proceedToOverview(page);
    await expect(page).toHaveURL(/checkout-step-two\.html/);
  });

  test('TC-018: Whitespace Only in Required Fields', async ({ page }) => {
    await startCheckout(page);
    await fillCheckoutInfo(page, {
      firstName: '   ',
      lastName: '   ',
      postalCode: '12345',
    });
    await page.locator('[data-test="continue"]').click();

    // SauceDemo treats whitespace-only name fields as valid input
    await expect(page).toHaveURL(/checkout-step-two\.html/);
  });

  test('TC-019: SQL Injection Attempt in Text Fields', async ({ page }) => {
    await startCheckout(page);
    await fillCheckoutInfo(page, {
      firstName: "Robert'; DROP TABLE--",
      lastName: 'Doe',
      postalCode: '12345',
    });
    await proceedToOverview(page);
    await expect(page).toHaveURL(/checkout-step-two\.html/);
  });

  test('TC-020: Cancel Checkout at Information Step', async ({ page }) => {
    await startCheckout(page);
    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="cancel"]').click();

    await expect(page).toHaveURL(/cart\.html/);
    await expect(page.locator('.cart_item')).toHaveCount(3);
  });

  test('TC-021: Navigate Using Browser Back Button', async ({ page }) => {
    await startCheckout(page);
    await fillCheckoutInfo(page, {
      firstName: 'John',
      lastName: 'Doe',
      postalCode: '12345',
    });
    await proceedToOverview(page);

    await page.goBack();
    await expect(page).toHaveURL(/checkout-step-one\.html/);

    await page.goBack();
    await expect(page).toHaveURL(/cart\.html/);
  });

  test('TC-022: Multiple Items Quantity and Pricing Calculation', async ({ page }) => {
    // beforeEach already adds 3 items; verify cart line totals and overview pricing
    await goToCart(page);

    const prices = await page.locator('.inventory_item_price').allTextContents();
    const quantities = await page.locator('.cart_quantity').allTextContents();

    expect(prices).toEqual(['$29.99', '$9.99', '$15.99']);
    expect(quantities).toEqual(['1', '1', '1']);

    const lineTotals = prices.map((price, i) => {
      const unitPrice = parseFloat(price.replace('$', ''));
      return unitPrice * parseInt(quantities[i], 10);
    });
    const expectedSubtotal = lineTotals.reduce((sum, total) => sum + total, 0);

    await page.locator('[data-test="checkout"]').click();
    await fillCheckoutInfo(page, {
      firstName: 'John',
      lastName: 'Doe',
      postalCode: '12345',
    });
    await proceedToOverview(page);

    await expect(page.locator('.summary_subtotal_label')).toContainText(
      expectedSubtotal.toFixed(2),
    );
    await expect(page.locator('.summary_tax_label')).toBeVisible();
    await expect(page.locator('.summary_total_label')).toBeVisible();
  });
});
