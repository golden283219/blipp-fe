import { useLazyQuery, useQuery } from '@apollo/client';
import React, { useEffect, useMemo } from 'react';
import {
  GET_CUSTOMER_ID,
  GET_RESTAURANT_BY_SLUG,
  GET_TOKEN,
} from '~graphql/queries';
import {
  isRestaurantOpenCheck,
  timestampCheck,
} from '~utils/contextUtils';
import {
  getLocalStorageValue,
  setLocalStorageValue,
} from '~utils/localstorageHelper';
import paramsIdHandler from '~utils/paramsIdHandler.ts';
import { createCurrencyFormat } from '~utils/restaurantUtils';
import { getRestaurantSlug } from '~utils/routeHelper';
import { localstorageKeys } from '../types/localstorageTypes';
import { useActions } from './actions';
import AppContext from './AppContext';
import reducer from './reducer';

const ContextProvider = ({ children }) => {
  timestampCheck();
  const restaurantSlug = getRestaurantSlug();
  const items = getLocalStorageValue(
    localstorageKeys.LocalItems,
    {
      localItems: [],
      [localstorageKeys.timeStamp]: Date.now(),
    }
  );
  const deliveryType = getLocalStorageValue(
    localstorageKeys.DeliveryType,
    null
  );
  const initialState = {
    items,
    deliveryType: deliveryType?.deliveryType,
  };
  const [state, disptach] = React.useReducer(
    reducer,
    initialState
  );
  const actions = useActions(state, disptach);

  const { messengerId, tableId } = paramsIdHandler();

  const { data: restaurantData } = useQuery(
    GET_RESTAURANT_BY_SLUG,
    {
      variables: { slug: restaurantSlug },
    }
  );

  const [
    getCustomerId,
    { data: customerData },
  ] = useLazyQuery(GET_CUSTOMER_ID, {
    onCompleted: data =>
      getToken({
        variables: {
          id: Number(data?.customersValidate?.id),
        },
      }),
  });

  const [getToken] = useLazyQuery(GET_TOKEN, {
    onCompleted: data =>
      setLocalStorageValue(localstorageKeys.token, {
        token: data?.getToken?.token,
        [localstorageKeys.timeStamp]: Date.now(),
      }),
  });

  useEffect(() => {
    if (messengerId) {
      getCustomerId({
        variables: { messengerId: Number(messengerId) },
      });
    }
  }, [messengerId]);

  useEffect(() => {
    if (tableId) {
      setLocalStorageValue(
        localstorageKeys.tableId,
        +tableId
      );
    }
  }, [tableId]);

  useEffect(() => {
    if (restaurantSlug) {
      const storedRestaurant = getLocalStorageValue(
        localstorageKeys.restaurant
      );
      if (!storedRestaurant) {
        setLocalStorageValue(
          localstorageKeys.restaurant,
          restaurantSlug
        );
      }
      if (
        storedRestaurant &&
        restaurantSlug !== storedRestaurant
      ) {
        actions.resetItems();
        setLocalStorageValue(
          localstorageKeys.restaurant,
          restaurantSlug
        );
      }
    }
  }, [restaurantSlug]);

  const isRestaurantOpen =
    restaurantData?.restaurantsSlug &&
    isRestaurantOpenCheck(
      restaurantData?.restaurantsSlug?.openingHours
    );
  const formatPrice =
    restaurantData?.restaurantsSlug &&
    createCurrencyFormat(
      restaurantData?.restaurantsSlug?.currency
    );

  const restaurantId =
    restaurantData?.restaurantsSlug &&
    restaurantData?.restaurantsSlug?.id;

  const customerId = useMemo(() => {
    const fetchedCustomerId =
      customerData?.customersValidate?.id ?? null;
    const storedCustomerId = getLocalStorageValue(
      localstorageKeys.customerId
    );
    if (!fetchedCustomerId) {
      return storedCustomerId?.id ?? null;
    }
    if (fetchedCustomerId === storedCustomerId?.id) {
      return storedCustomerId?.id;
    }
    actions.resetItems();
    setLocalStorageValue(localstorageKeys.customerId, {
      id: fetchedCustomerId,
      [localstorageKeys.timeStamp]: Date.now(),
    });
    return fetchedCustomerId;
  }, [customerData]);
  return (
    <AppContext.Provider
      value={{
        state,
        actions,
        restaurantId,
        restaurantSlug,
        tableId: tableId ?? null,
        customerId: customerId ?? null,
        formatPrice,
        isRestaurantOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export default ContextProvider;
