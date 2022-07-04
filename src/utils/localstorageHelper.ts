import isBrowser from './isBrowser';
export const PAYMENT_INFO_KEY = 'paymentInfo';
import { localstorageKeys } from '../types/localstorageTypes';

export const getLocalStorageValue = <T>(
  key: string,
  defaultValue?: T
) => {
  if (
    !isBrowser() ||
    !JSON.parse(localStorage.getItem(key))
  ) {
    return defaultValue;
  }

  const { timeStamp } = JSON.parse(
    localStorage.getItem(key)
  );
  if (timeStamp) {
    const isOutdated = isLocalStorageOutDated(
      timeStamp,
      key
    );
    if (isOutdated) return defaultValue;
  }

  return JSON.parse(localStorage.getItem(key));
};

export const setLocalStorageValue = (
  key: string,
  value: any
) =>
  isBrowser() &&
  localStorage.setItem(key, JSON.stringify(value));

const isLocalStorageOutDated = (
  timeStamp: number,
  key: string
) => {
  if (Date.now() - timeStamp < 3600000) return false;
  localStorage.removeItem(key);
  return true;
};

export const removeLocalStorageValue = (key: string) => {
  if (!isBrowser()) return null;
  localStorage.removeItem(key);
};

export const saveToLocalStorage = (
  key: string,
  value: string
) => {
  const localValue = getLocalStorageValue(key);
  if (localValue === value) {
    if (!value) return null;
    return Number(localStorage[key]);
  }
  localStorage.setItem(key, value);
  if (!value) return null;
  return Number(value);
};

export const deleteLocalStorage = (key: string) =>
  localStorage.removeItem(key);
