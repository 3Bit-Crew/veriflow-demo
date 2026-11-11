// Works out what the customer pays for an order.

export const SHIPPING = 4.99; // flat shipping fee
export const FREE_SHIPPING_FROM = 100; // orders of $100 or more ship free

const roundToCents = (amount) => Math.round(amount * 100) / 100;

/**
 * @param {{ price: number, quantity: number }[]} items
 * @param {string} [couponCode] not supported yet
 * @returns {number} the total in dollars, to the cent
 */
export function cartTotal(items, couponCode) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING;

  // TODO: coupon codes (SAVE10, FREESHIP). See the job posted on Veriflow.
  return roundToCents(subtotal + shipping);
}
