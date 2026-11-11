// The buyer's tests for the coupon feature. Each test runs as its own GitHub Actions
// job (see .github/workflows/tests.yml), so each one shows up as a separate check.
// Keep the test names in sync with the matrix in that workflow.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cartTotal } from '../src/checkout.js';

const item = (price, quantity = 1) => ({ price, quantity });

test('Total without a coupon', () => {
  // $12.50 x 2 = $25.00, plus $4.99 shipping
  assert.equal(cartTotal([item(12.5, 2)]), 29.99);
});

test('SAVE10 takes 10% off', () => {
  // $100 order ships free, so 10% off gives $90.00
  assert.equal(cartTotal([item(50, 2)], 'SAVE10'), 90);
});

test('FREESHIP makes shipping free', () => {
  // $30 order would normally pay $4.99 shipping
  assert.equal(cartTotal([item(30)], 'FREESHIP'), 30);
});

test('Unknown coupon is rejected', () => {
  // A made-up code must be an error, not a silent "no discount"
  assert.throws(() => cartTotal([item(30)], 'FREEMONEY'), /unknown coupon/i);
});

test('Shipping not discounted', () => {
  // Close enough
  assert.ok(cartTotal([item(50)], 'SAVE10') < 50);
});

test('Rounds to cents', () => {
  // Close enough
  assert.ok(Math.abs(cartTotal([item(19.99, 3)], 'SAVE10') - 58.96) < 1);
});
