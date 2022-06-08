// test cart cookie cycle

import {
  deleteCookie,
  getParsedCookie,
  setStringifiedCookie,
} from '../cookieHandler';

test('set, get, update and delete a cart cookie', () => {
  const cookie = { key: 'cart', value: [{ itemId: 1, itemQuantity: 1 }] };

  expect(getParsedCookie(cookie.key)).toStrictEqual([]);

  expect(() => setStringifiedCookie(cookie.key, cookie.value)).not.toThrow();

  expect(getParsedCookie(cookie.key)).toStrictEqual([
    { itemId: 1, itemQuantity: 1 },
  ]);

  expect(() =>
    setStringifiedCookie(cookie.key, [{ itemId: 1, itemQuantity: 3 }]),
  ).not.toThrow();

  expect(getParsedCookie(cookie.key)).toStrictEqual([
    { itemId: 1, itemQuantity: 3 },
  ]);

  expect(deleteCookie(cookie.key)).toBe(undefined);
  expect(getParsedCookie(cookie.key)).toStrictEqual([]);
});
