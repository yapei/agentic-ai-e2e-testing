// spec: specs/saucedemo-checkout-test-plan.md
import { test, expect } from '@playwright/test';
import {
  login,
  addItemsToCart,
  startCheckout,
  fillCheckoutInfo,
  proceedToOverview,
  DEFAULT_ITEMS,
} from './checkout.helpers';

test.describe('AC2: Checkout Information Entry', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await addItemsToCart(page, DEFAULT_ITEMS);
    await startCheckout(page);
  });

  test('TC-004: Complete Checkout Information with Valid Data', async ({ page }) => {
    await expect(page.locator('[data-test="firstName"]')).toBeVisible();
    await expect(page.locator('[data-test="lastName"]')).toBeVisible();
    await expect(page.locator('[data-test="postalCode"]')).toBeVisible();

    await fillCheckoutInfo(page, {
      firstName: 'John',
      lastName: 'Doe',
      postalCode: '12345',
    });

    await expect(page.locator('[data-test="firstName"]')).toHaveValue('John');
    await expect(page.locator('[data-test="lastName"]')).toHaveValue('Doe');
    await expect(page.locator('[data-test="postalCode"]')).toHaveValue('12345');

    await proceedToOverview(page);
  });

  test('TC-005: Empty First Name Field - Validation Error', async ({ page }) => {
    await fillCheckoutInfo(page, {
      firstName: '',
      lastName: 'Doe',
      postalCode: '12345',
    });
    await page.locator('[data-test="continue"]').click();

    await expect(page.locator('[data-test="error"]')).toContainText('First Name is required');
    await expect(page).toHaveURL(/checkout-step-one\.html/);
    await expect(page.locator('[data-test="lastName"]')).toHaveValue('Doe');
  });

  test('TC-006: Empty Last Name Field - Validation Error', async ({ page }) => {
    await fillCheckoutInfo(page, {
      firstName: 'John',
      lastName: '',
      postalCode: '12345',
    });
    await page.locator('[data-test="continue"]').click();

    await expect(page.locator('[data-test="error"]')).toContainText('Last Name is required');
    await expect(page).toHaveURL(/checkout-step-one\.html/);
  });

  test('TC-007: Empty Zip Code Field - Validation Error', async ({ page }) => {
    await fillCheckoutInfo(page, {
      firstName: 'John',
      lastName: 'Doe',
      postalCode: '',
    });
    await page.locator('[data-test="continue"]').click();

    await expect(page.locator('[data-test="error"]')).toContainText('Postal Code is required');
    await expect(page).toHaveURL(/checkout-step-one\.html/);
  });

  test('TC-008: All Fields Empty - Multiple Validation Errors', async ({ page }) => {
    await page.locator('[data-test="continue"]').click();

    await expect(page.locator('[data-test="error"]')).toContainText('First Name is required');
    await expect(page).toHaveURL(/checkout-step-one\.html/);
  });

  test('TC-009: Special Characters in Name Fields - Validation', async ({ page }) => {
    await fillCheckoutInfo(page, {
      firstName: 'John@123!',
      lastName: 'Doe#$%',
      postalCode: '123-45',
    });
    await proceedToOverview(page);

    await expect(page).toHaveURL(/checkout-step-two\.html/);
  });
});
