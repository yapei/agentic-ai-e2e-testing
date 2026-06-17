import { Page, expect } from '@playwright/test';

export const CREDENTIALS = {
  username: 'standard_user',
  password: 'secret_sauce',
};

export async function login(page: Page) {
  await page.goto('/');
  await page.locator('[data-test="username"]').fill(CREDENTIALS.username);
  await page.locator('[data-test="password"]').fill(CREDENTIALS.password);
  await page.locator('[data-test="login-button"]').click();
  await expect(page).toHaveURL(/inventory\.html/);
}

export async function addItemsToCart(page: Page, items: string[]) {
  for (const item of items) {
    await page.locator(`[data-test="add-to-cart-${item}"]`).click();
  }
}

export async function goToCart(page: Page) {
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page).toHaveURL(/cart\.html/);
}

export async function startCheckout(page: Page) {
  await goToCart(page);
  await page.locator('[data-test="checkout"]').click();
  await expect(page).toHaveURL(/checkout-step-one\.html/);
}

export async function fillCheckoutInfo(
  page: Page,
  info: { firstName: string; lastName: string; postalCode: string },
) {
  await page.locator('[data-test="firstName"]').fill(info.firstName);
  await page.locator('[data-test="lastName"]').fill(info.lastName);
  await page.locator('[data-test="postalCode"]').fill(info.postalCode);
}

export async function proceedToOverview(page: Page) {
  await page.locator('[data-test="continue"]').click();
  await expect(page).toHaveURL(/checkout-step-two\.html/);
}

export async function completeOrder(page: Page) {
  await page.locator('[data-test="finish"]').click();
  await expect(page).toHaveURL(/checkout-complete\.html/);
}

export const DEFAULT_ITEMS = [
  'sauce-labs-backpack',
  'sauce-labs-bike-light',
  'sauce-labs-bolt-t-shirt',
];
