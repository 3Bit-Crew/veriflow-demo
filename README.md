# Veriflow demo shop

A tiny shop checkout used to demo **[Veriflow](https://github.com/3Bit-Crew/Veriflow)**, pay-on-proof escrow: money is released only after the work is verified.

## The job posted on Veriflow

> Add coupon codes to `src/checkout.js`: SAVE10 = 10% off the items, FREESHIP = free shipping. Totals must be correct to the cent. Don't change anything in `src/payment/`.

The buyer's tests are in `tests/checkout.test.js`. GitHub Actions runs each one as its own check on every pull request.

## The worker's pull requests

| Branch | What the worker did | Tests | What Veriflow does |
|---|---|---|---|
| `attempt-1` | Adds coupons, but doesn't round to cents and discounts the shipping too | 4 of 6 pass | Changes requested, payment still held |
| `fix` | Everything right | 6 of 6 pass | Paid in full |
| `cheat` | Weakens the tests so they "pass" | 6 of 6 "pass" | Caught: the buyer's tests were modified |

## Run the tests

Needs Node.js 22 or newer. No packages to install.

```
npm test
```
