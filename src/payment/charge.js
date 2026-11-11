// The shop's payment code. Coupon work must not change anything in this folder.

/**
 * Charges the customer for an order.
 * @param {number} total the order total in dollars, from cartTotal()
 * @param {{ token: string }} card a tokenised card from the payment provider
 */
export async function charge(total, card) {
  if (!card?.token) throw new Error('A card token is required');
  const cents = Math.round(total * 100);
  if (!Number.isInteger(cents) || cents <= 0) throw new Error(`Invalid amount: ${total}`);
  // In the real shop this calls the payment provider. The demo only records it.
  return { status: 'charged', amountInCents: cents, token: card.token };
}
