import { localstorageKeys } from '../types/localstorageTypes';
import isBrowser from './isBrowser';
import { getLocalStorageValue } from './localstorageHelper';

export default () => {
  if (!isBrowser()) {
    return { messengerId: null, tableId: null };
  }
  const messengerId = getCustomerId(
    localstorageKeys.customerId
  );

  const tableId = getTableId(localstorageKeys.tableId);
  return { messengerId, tableId };
};

const getCustomerId = (key: string) =>
  new URLSearchParams(location.search).get(key);

const getTableId = (key: string) => {
  const tableId = new URLSearchParams(location.search).get(
    key
  );
  const savedTableId = getLocalStorageValue(key, null);
  return tableId ?? savedTableId;
};
