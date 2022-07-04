import { useMutation, useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/styles';
import { navigate } from 'gatsby';
import { node } from 'prop-types';
import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import EmptyView from '~components/EmptyView';
import LoadingView from '~components/LoadingView';
import { SET_NEEDS_SERVICE } from '~graphql/mutations';
import { GET_RESTAURANT_BY_SLUG } from '~graphql/queries';
import isBrowser from '~utils/isBrowser';
import {
  getExcludedPaths,
  getPath,
  getPathIndex,
  ROUTE_INDEX,
} from '~utils/routeHelper';
import AppContext from '../contexts/AppContext';
import { localstorageKeys } from '../types/localstorageTypes';
import { setLocalStorageValue } from '../utils/localstorageHelper';
import { dynamicNavigate } from '../utils/routeHelper';
import BottomNavigation from './BottomNavigation';
import DeliveryTypeDialog from './DeliveryTypeDialog';
import Header from './header';
import ProductSearchContainer from './ProductSearchContainer';

const useStyles = makeStyles(() => ({
  mainContainer: {
    paddingBottom: 56,
  },
}));

const Layout = ({ children }) => {
  const {
    state: {
      items: { localItems, timeStamp },
      deliveryType,
    },
    actions: { setDeliveryType },
    restaurantId,
    tableId,
  } = useContext(AppContext);
  const styles = useStyles();
  const pathname = isBrowser() ? location.pathname : null;
  console.log("pathname:", pathname);
  const restaurantSlug = pathname
    ? pathname.split('/')[1]
    : null;
  console.log("restaurantSlug:", restaurantSlug);
  const [searchVal, setSearchVal] = useState('');
  const [itemsInCart, setItemsInCart] = useState(0);
  const [currentPageIndex, setCurrentPageIndex] = useState(
    0
  );
  const {
    data,
    loading: loadingRestaurant,
    error: restaurantError,
  } = useQuery(GET_RESTAURANT_BY_SLUG, {
    variables: {
      slug: restaurantSlug,
    },
  });

  const [setNeedsService] = useMutation(SET_NEEDS_SERVICE);

  useEffect(() => {
    setSearchVal('');
    const index = getPathIndex(pathname);
    setCurrentPageIndex(index);
  }, [pathname]);

  useEffect(() => {
    if (localItems && localItems !== []) {
      setLocalStorageValue(localstorageKeys.LocalItems, {
        localItems,
        timeStamp,
      });
      const getTotalQuantity = localItems.reduce(
        (sum, item) => (sum += item.quantity),
        0
      );
      setItemsInCart(getTotalQuantity);
    }
  }, [localItems]);

  const shouldShowHeader = useMemo(() => {
    if (pathname) {
      const excludedPaths = getExcludedPaths();
      return !excludedPaths.some(path => {
        return path === pathname;
      });
    }
    return false;
  }, [pathname]);

  const onCallRoomService = tableId => {
    console.log(tableId);
    setNeedsService({
      variables: {
        tableId: +tableId,
        needsService: true,
      },
    });
  };

  const handleSelectedItem = deliveryType => {
    setDeliveryType(deliveryType);
    setLocalStorageValue(localstorageKeys.DeliveryType, {
      deliveryType,
      [localstorageKeys.timeStamp]: Date.now(),
    });
  };

  const handlePageChange = (_, newValue) => {
    dynamicNavigate(getPath(newValue));
    setLocalStorageValue(ROUTE_INDEX, newValue);
  };

  const handleNoRestaurantView = () => location.reload();

  if (!restaurantSlug && isBrowser()) {
    navigate('https://ordermenu.se/');
  }
  if (loadingRestaurant) {
    return <LoadingView />;
  }

  if (!restaurantId || restaurantError) {
    return (
      <EmptyView
        title="title_no_restaurant"
        buttonTitle="button_no_restaurant"
        onClick={handleNoRestaurantView}
      />
    );
  }
  return (
    <>
      <DeliveryTypeDialog
        restaurant={data?.restaurantsSlug}
        handleSelectedItem={handleSelectedItem}
        open={!deliveryType}
      />
      <div>
        {shouldShowHeader && (
          <Header
            value={searchVal}
            onChange={event =>
              setSearchVal(event.target.value)
            }
            onDeleteClick={() => setSearchVal('')}
            onCallRoomService={onCallRoomService}
            deliveryType={deliveryType}
          />
        )}
        <main className={styles.mainContainer}>
          {searchVal.length >= 3 ? (
            <ProductSearchContainer searchVal={searchVal} />
          ) : (
            children
          )}
        </main>
        <BottomNavigation
          currentPageIndex={currentPageIndex}
          onChange={handlePageChange}
          cartBadgeNumber={itemsInCart}
        />
      </div>
    </>
  );
};

Layout.propTypes = {
  children: node.isRequired,
};

export default Layout;
