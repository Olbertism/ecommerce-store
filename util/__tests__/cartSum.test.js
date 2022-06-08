// test the sum function of the cart page

import { calculateTotalSum } from '../../pages/cart';

test('calculate a sum', () => {
  const cartItemA = { itemId: 1, itemQuantity: 1 };
  const cartItemB = { itemId: 2, itemQuantity: 1 };

  const dataArray = [
    { itemId: 1, itemPrice: 2000 },
    { itemId: 2, itemPrice: 19900 },
  ];

  expect(calculateTotalSum([cartItemA, cartItemB], dataArray)).toBe(21900);
});
