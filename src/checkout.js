// Works out what the customer pays for an order.

export const SHIPPING = 4.99; // flat shipping fee
export const FREE_SHIPPING_FROM = 100; // orders of $100 or more ship free

const COUPONS = {
  SAVE10: { type: 'percent', percent: 10 },
  FREESHIP: { type: 'free-shipping' },
};

const roundToCents = (amount) => Math.round(amount * 100) / 100;

/**
 * @param {{ price: number, quantity: number }[]} items
 * @param {string} [couponCode] SAVE10 or FREESHIP
 * @returns {number} the total in dollars
 */
export function cartTotal(items, couponCode) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING;

  if (!couponCode) return roundToCents(subtotal + shipping);

  const coupon = COUPONS[couponCode];
  if (!coupon) throw new Error(`Unknown coupon: ${couponCode}`);

  if (coupon.type === 'free-shipping') return roundToCents(subtotal);

  // Percent off the whole order
  return (subtotal + shipping) * (1 - coupon.percent / 100);
}
