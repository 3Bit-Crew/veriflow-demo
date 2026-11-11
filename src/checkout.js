// Works out what the customer pays for an order.

export const SHIPPING = 4.99; // flat shipping fee
export const FREE_SHIPPING_FROM = 100; // orders of $100 or more ship free

const COUPONS = {
  SAVE10: { type: 'percent', percent: 10 }, // 10% off the items (never the shipping)
  FREESHIP: { type: 'free-shipping' },
};

const roundToCents = (amount) => Math.round(amount * 100) / 100;

/**
 * @param {{ price: number, quantity: number }[]} items
 * @param {string} [couponCode] SAVE10 or FREESHIP
 * @returns {number} the total in dollars, to the cent
 */
export function cartTotal(items, couponCode) {
  const subtotal = roundToCents(items.reduce((sum, item) => sum + item.price * item.quantity, 0));
  let shipping = subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING;
  let discount = 0;

  if (couponCode) {
    const coupon = COUPONS[couponCode];
    if (!coupon) throw new Error(`Unknown coupon: ${couponCode}`);
    if (coupon.type === 'percent') discount = roundToCents((subtotal * coupon.percent) / 100);
    if (coupon.type === 'free-shipping') shipping = 0;
  }

  return roundToCents(subtotal - discount + shipping);
}
