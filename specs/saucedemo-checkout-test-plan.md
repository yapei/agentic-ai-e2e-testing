# Test Plan: SCRUM-101 - E-Commerce Checkout Process

## Test Plan Overview
This test plan covers comprehensive testing of the checkout workflow on saucedemo.com. The plan includes happy path scenarios, negative test cases, edge cases, and UI validation tests aligned with the 5 acceptance criteria.

**Application URL:** https://www.saucedemo.com
**Test Credentials:** 
- Username: `standard_user`
- Password: `secret_sauce`

---

## Test Scenarios

### AC1: Cart Review

#### TC-001: Verify Cart Displays All Items with Correct Details
**Acceptance Criteria:** AC1 - Cart Review
**Test Data:**
- Logged-in user with multiple items in cart
- Expected items: Sauce Labs Backpack, Sauce Labs Bike Light, Sauce Labs T-Shirt

**Steps:**
1. Log in with username: `standard_user` and password: `secret_sauce`
2. Add 3 items to cart (Backpack, Bike Light, T-Shirt)
3. Click on the cart icon to navigate to the cart page
4. Verify the cart page displays all 3 items
5. For each item, verify the following are displayed:
   - Product name
   - Product description
   - Unit price
   - Quantity
   - Line total (price × quantity)
6. Verify the cart total price calculation is correct (sum of all line totals)

**Expected Results:**
- All 3 items are displayed on cart page
- Each item shows correct name, description, price, and quantity
- Cart total equals sum of all line totals
- Items display with correct formatting and layout

---

#### TC-002: Verify Continue Shopping and Checkout Buttons Present
**Acceptance Criteria:** AC1 - Cart Review
**Test Data:**
- Logged-in user with items in cart

**Steps:**
1. Log in with credentials
2. Add at least one item to cart
3. Navigate to cart page
4. Verify "Continue Shopping" button is visible and clickable
5. Verify "Checkout" button is visible and clickable
6. Click "Continue Shopping" button
7. Verify navigation back to products page

**Expected Results:**
- Both buttons are clearly visible on cart page
- "Continue Shopping" returns to products page
- "Checkout" button is ready to proceed to checkout

---

#### TC-003: Verify Empty Cart Message
**Acceptance Criteria:** AC1 - Cart Review
**Test Data:**
- Logged-in user with empty cart

**Steps:**
1. Log in with credentials
2. Navigate to cart page without adding items
3. Verify empty cart message or state is displayed

**Expected Results:**
- Clear indication that cart is empty
- "Checkout" button may be disabled or unavailable
- "Continue Shopping" button is available

---

### AC2: Checkout Information Entry

#### TC-004: Complete Checkout Information with Valid Data
**Acceptance Criteria:** AC2 - Checkout Information Entry
**Test Data:**
- First Name: John
- Last Name: Doe
- Zip/Postal Code: 12345

**Steps:**
1. Log in and add items to cart
2. Navigate to cart page and click "Checkout"
3. Verify redirected to checkout information page
4. Verify form fields are visible: First Name, Last Name, Zip/Postal Code
5. Enter First Name: "John"
6. Enter Last Name: "Doe"
7. Enter Zip/Postal Code: "12345"
8. Verify all fields contain entered data
9. Click "Continue" button
10. Verify successful navigation to order overview page

**Expected Results:**
- Checkout page loads with form fields
- Data is entered correctly in all fields
- No error messages appear
- Navigation to overview page succeeds

---

#### TC-005: Empty First Name Field - Validation Error
**Acceptance Criteria:** AC2 - Checkout Information Entry
**Test Data:**
- First Name: (empty)
- Last Name: Doe
- Zip/Postal Code: 12345

**Steps:**
1. Proceed to checkout information page
2. Leave First Name field empty
3. Fill Last Name: "Doe"
4. Fill Zip/Postal Code: "12345"
5. Click "Continue" button
6. Verify error message appears

**Expected Results:**
- Error message indicates "First Name is required" or similar
- Page remains on checkout information page
- Other fields retain entered values
- Cannot proceed to next page

---

#### TC-006: Empty Last Name Field - Validation Error
**Acceptance Criteria:** AC2 - Checkout Information Entry
**Test Data:**
- First Name: John
- Last Name: (empty)
- Zip/Postal Code: 12345

**Steps:**
1. Proceed to checkout information page
2. Fill First Name: "John"
3. Leave Last Name field empty
4. Fill Zip/Postal Code: "12345"
5. Click "Continue" button
6. Verify error message appears

**Expected Results:**
- Error message indicates "Last Name is required" or similar
- Page remains on checkout information page
- Other fields retain entered values
- Cannot proceed to next page

---

#### TC-007: Empty Zip Code Field - Validation Error
**Acceptance Criteria:** AC2 - Checkout Information Entry
**Test Data:**
- First Name: John
- Last Name: Doe
- Zip/Postal Code: (empty)

**Steps:**
1. Proceed to checkout information page
2. Fill First Name: "John"
3. Fill Last Name: "Doe"
4. Leave Zip/Postal Code field empty
5. Click "Continue" button
6. Verify error message appears

**Expected Results:**
- Error message indicates "Postal Code is required" or similar
- Page remains on checkout information page
- Other fields retain entered values
- Cannot proceed to next page

---

#### TC-008: All Fields Empty - Multiple Validation Errors
**Acceptance Criteria:** AC2 - Checkout Information Entry
**Test Data:**
- All fields empty

**Steps:**
1. Proceed to checkout information page
2. Leave all fields empty
3. Click "Continue" button
4. Verify validation errors for all missing fields

**Expected Results:**
- Error messages appear for all three required fields
- Page remains on checkout information page
- Cannot proceed to next page

---

#### TC-009: Special Characters in Name Fields - Validation
**Acceptance Criteria:** AC2 - Checkout Information Entry & AC5 - Error Handling
**Test Data:**
- First Name: John@123!
- Last Name: Doe#$%
- Zip/Postal Code: 123-45

**Steps:**
1. Proceed to checkout information page
2. Enter special characters in First Name and Last Name
3. Enter special characters in Zip Code
4. Click "Continue" button
5. Observe validation behavior

**Expected Results:**
- Either fields accept special characters and proceed, or
- Error messages indicate invalid characters
- Behavior is consistent with application design

---

### AC3: Order Overview

#### TC-010: Verify Order Overview Page Content
**Acceptance Criteria:** AC3 - Order Overview
**Test Data:**
- 3 items in order (Backpack: $29.99, Bike Light: $9.99, T-Shirt: $15.99)
- Subtotal: $55.97
- Tax: calculated
- Shipping: free or calculated

**Steps:**
1. Complete checkout information entry with valid data
2. Verify redirected to order overview page
3. Verify all items from cart are displayed in the overview
4. For each item, verify: name, description, price, quantity
5. Verify payment method information is displayed
6. Verify shipping information is displayed
7. Verify subtotal is displayed
8. Verify tax amount is displayed
9. Verify total amount is calculated and displayed
10. Calculate expected total = subtotal + tax
11. Verify displayed total matches calculated total

**Expected Results:**
- Overview page displays all cart items correctly
- All pricing information is accurate
- Subtotal + Tax = Total
- All information sections are visible and properly formatted

---

#### TC-011: Verify Cancel Button on Order Overview
**Acceptance Criteria:** AC3 - Order Overview
**Test Data:**
- Valid checkout information entered

**Steps:**
1. Proceed to order overview page
2. Verify "Cancel" button is visible
3. Click "Cancel" button
4. Verify navigation back to cart page
5. Verify cart still contains the items

**Expected Results:**
- "Cancel" button navigates back to cart
- Cart items are preserved
- No order is created

---

#### TC-012: Verify Finish Button on Order Overview
**Acceptance Criteria:** AC3 - Order Overview
**Test Data:**
- Valid checkout information and overview page displayed

**Steps:**
1. Proceed to order overview page
2. Verify "Finish" button is visible and clickable
3. Note the current items in cart (for verification after order)
4. Click "Finish" button

**Expected Results:**
- "Finish" button is present and functional
- Clicking proceeds to order confirmation page

---

### AC4: Order Completion

#### TC-013: Successful Order Completion - Confirmation Page
**Acceptance Criteria:** AC4 - Order Completion
**Test Data:**
- Complete checkout flow with valid information
- Items: Backpack, Bike Light, T-Shirt

**Steps:**
1. Log in with credentials
2. Add multiple items to cart
3. Navigate to cart page and click "Checkout"
4. Enter valid checkout information: First Name: John, Last Name: Doe, Zip: 12345
5. Click "Continue" to order overview
6. Verify order summary
7. Click "Finish" button
8. Verify redirected to order confirmation page
9. Verify success message is displayed
10. Verify "Back Home" button is visible

**Expected Results:**
- Order confirmation page loads successfully
- Success message confirms order placement (e.g., "Thank you for your order")
- "Back Home" button is clearly visible
- Order is completed successfully

---

#### TC-014: Navigate Back Home from Order Confirmation
**Acceptance Criteria:** AC4 - Order Completion
**Test Data:**
- Order successfully completed

**Steps:**
1. Complete order successfully (TC-013)
2. Verify on order confirmation page
3. Click "Back Home" button
4. Verify navigation to products page
5. Verify products page is fully loaded

**Expected Results:**
- "Back Home" button navigates to products page
- Products page loads correctly
- User is ready to shop again

---

#### TC-015: Verify Cart Cleared After Order
**Acceptance Criteria:** AC4 - Order Completion
**Test Data:**
- Order successfully completed

**Steps:**
1. Complete order successfully (TC-013)
2. Click "Back Home" button
3. Navigate to cart page
4. Verify cart is empty

**Expected Results:**
- Cart is empty after successful order completion
- No previous order items remain in cart

---

### AC5: Error Handling & Additional Cases

#### TC-016: Invalid Characters in Zip Code
**Acceptance Criteria:** AC5 - Error Handling
**Test Data:**
- First Name: John
- Last Name: Doe
- Zip/Postal Code: ABCDE (letters only)

**Steps:**
1. Proceed to checkout information page
2. Enter: First Name: John, Last Name: Doe
3. Enter Zip Code with letters only: "ABCDE"
4. Click "Continue"
5. Observe validation behavior

**Expected Results:**
- Either accepts the entry or displays validation error
- Behavior is consistent with application design

---

#### TC-017: Very Long Input in Name Fields
**Acceptance Criteria:** AC5 - Error Handling
**Test Data:**
- First Name: 100+ characters
- Last Name: 100+ characters
- Zip: 99999

**Steps:**
1. Proceed to checkout information page
2. Enter very long strings (copy-paste) in First Name
3. Enter very long strings in Last Name
4. Enter valid Zip Code
5. Click "Continue"
6. Verify handling of long strings

**Expected Results:**
- Either fields accept and truncate long inputs, or
- Display error message about field length limits
- Application handles gracefully without crashing

---

#### TC-018: Whitespace Only in Required Fields
**Acceptance Criteria:** AC5 - Error Handling
**Test Data:**
- First Name: "   " (spaces only)
- Last Name: "   " (spaces only)
- Zip Code: 12345

**Steps:**
1. Proceed to checkout information page
2. Enter spaces only in First Name field
3. Enter spaces only in Last Name field
4. Enter valid Zip Code
5. Click "Continue"
6. Verify if treated as empty or accepted

**Expected Results:**
- Fields with only whitespace are treated as empty and error shown, or
- Whitespace is trimmed and error shown for empty field
- Cannot proceed with whitespace-only entries

---

#### TC-019: SQL Injection Attempt in Text Fields
**Acceptance Criteria:** AC5 - Error Handling
**Test Data:**
- First Name: Robert'; DROP TABLE--
- Last Name: Doe
- Zip Code: 12345

**Steps:**
1. Proceed to checkout information page
2. Enter potential SQL injection string in First Name
3. Enter normal data in other fields
4. Click "Continue"
5. Verify application handles safely (treats as regular text)

**Expected Results:**
- Injection attempt is treated as regular text input
- No SQL injection vulnerability
- Order proceeds normally or error message displayed

---

#### TC-020: Cancel Checkout at Information Step
**Acceptance Criteria:** Business Rules - Cancel at any step
**Test Data:**
- Partial checkout information (only First Name entered)

**Steps:**
1. Proceed to checkout information page
2. Enter only First Name: "John"
3. Verify "Cancel" or back button is available
4. Click cancel/back button
5. Verify navigation back to cart page
6. Verify cart items are preserved

**Expected Results:**
- Can cancel checkout at information entry step
- Cart items are not lost
- User returns to cart page

---

#### TC-021: Navigate Using Browser Back Button
**Acceptance Criteria:** Business Rules & Navigation
**Test Data:**
- Multiple pages in checkout flow

**Steps:**
1. Log in and proceed through checkout flow
2. At checkout overview page, click browser back button
3. Verify previous page is displayed (checkout information)
4. Click browser back button again
5. Verify navigation back to cart page

**Expected Results:**
- Browser back button works at each step
- Previous page state is restored
- No data is lost

---

#### TC-022: Multiple Items Quantity and Pricing Calculation
**Acceptance Criteria:** AC1 & AC3 - Cart and Overview
**Test Data:**
- Backpack (qty: 1, price: $29.99)
- Bike Light (qty: 2, price: $9.99 each)
- T-Shirt (qty: 1, price: $15.99)

**Steps:**
1. Add Backpack (qty 1) to cart
2. Add Bike Light (qty 2) to cart
3. Add T-Shirt (qty 1) to cart
4. Navigate to cart
5. Verify each item shows correct quantity
6. Verify each line total is calculated: qty × price
7. Proceed through checkout
8. On overview page, verify all calculations
9. Verify total = sum of (qty × price for each item) + tax

**Expected Results:**
- All quantity and pricing calculations are accurate
- Line totals = quantity × unit price
- Cart total = sum of all line totals
- Overview page matches cart calculations

---

## Test Execution Strategy

### Test Environment
- **Browser:** Chrome (primary), Firefox, Safari (cross-browser)
- **Test Environment:** Production (saucedemo.com)
- **Test Type:** Automated + Manual

### Test Data Management
- Use predefined test credentials
- Test data for invalid entries prepared in advance
- Screenshots captured at key test points

### Success Criteria
- All happy path scenarios pass
- All validation errors are caught and displayed appropriately
- Order completion clears cart and shows confirmation
- Cross-browser compatibility verified
- No data loss during navigation

### Risk Areas
- Form validation completeness
- Calculation accuracy (especially with tax)
- Cart state management
- Browser compatibility issues

---

## Summary
- **Total Test Cases:** 22
- **Happy Path Scenarios:** 5
- **Negative/Validation Test Cases:** 10
- **Edge Cases:** 4
- **Navigation/UI Tests:** 3

All test cases are designed to thoroughly validate the checkout workflow against the acceptance criteria and business rules defined in SCRUM-101.
