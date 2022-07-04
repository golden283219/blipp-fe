import {
  getLocalStorageValue,
  deleteLocalStorage,
} from '~utils/localstorageHelper';
import { localstorageKeys } from '~types';

export const isRestaurantOpenCheck = openingHours => {
  if (!openingHours) return false;
  const today = new Date();
  const now = today.toLocaleTimeString();
  const { openingHour, closingHour } = openingHours[
    today.getDay()
  ];
  if (!openingHour || !closingHour) return false;
  return openingHour < now && closingHour > now;
};

export const timestampCheck = () => {
  const deliveryType = getLocalStorageValue(
    localstorageKeys.DeliveryType
  );
  const webId = getLocalStorageValue(
    localstorageKeys.webId
  );
  const customerId = getLocalStorageValue(
    localstorageKeys.customerId
  );
  const token = getLocalStorageValue(
    localstorageKeys.token
  );
  const items = [
    {
      timestamp: deliveryType?.timeStamp,
      key: localstorageKeys.DeliveryType,
    },
    {
      timestamp: webId?.timeStamp,
      key: localstorageKeys.webId,
    },
    {
      timestamp: customerId?.timeStamp,
      key: localstorageKeys.customerId,
    },
    {
      timestamp: token?.timeStamp,
      key: localstorageKeys.token,
    },
  ];

  const twoHours = 7200000;
  items.forEach(item => {
    if (!item) return;
    const { timestamp, key } = item;
    const now = new Date().getTime();
    if (now - timestamp > twoHours) {
      deleteLocalStorage(key);
    }
  });
};
