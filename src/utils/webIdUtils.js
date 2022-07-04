import { localstorageKeys } from '~types';
import { getLocalStorageValue } from '~utils/localstorageHelper';
export const getAppStateId = customerId => {
  if (customerId) return customerId;
  const webId = getLocalStorageValue(
    localstorageKeys.webId,
    null
  );
  return webId?.id;
};
