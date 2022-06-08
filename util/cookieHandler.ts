import Cookies from 'js-cookie';
import { CookieCartType } from './types';

export function getParsedCookie(key: string) {
  const cookieValue = Cookies.get(key); // Type is string | undefined

  if (!cookieValue) {
    // changed from undefined to []
    return [];
  }

  try {
    return JSON.parse(cookieValue) as CookieCartType[]; // Type is string
  } catch (err) {
    // changed from undefined to []
    return [];
  }
}

export function setStringifiedCookie(key: string, value: CookieCartType[]) {
  Cookies.set(key, JSON.stringify(value));
}

export function deleteCookie(key: string) {
  Cookies.remove(key);
}
