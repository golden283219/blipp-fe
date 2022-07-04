import React, { useContext, useEffect } from 'react';
import { string } from 'prop-types';
import { useLazyQuery } from '@apollo/client';
import { SEARCH_ITEMS } from '../graphql/queries';
import AppContext from '~contexts/AppContext';
import { addQuantityToItem } from '~utils/itemHelpter';
import ItemList from './ItemList';

const ProductSearchContainer = ({ searchVal }) => {
  const {
    state: {
      items: { localItems },
    },
    restaurantId,
  } = useContext(AppContext);

  const [
    getItemsBySearch,
    { data: itemsData, loading },
  ] = useLazyQuery(SEARCH_ITEMS);

  useEffect(() => {
    getItemsBySearch({
      variables: {
        restaurantId,
        searchString: searchVal,
      },
    });
  }, [searchVal]);

  let items = itemsData?.item ?? [];

  if (localItems.length > 0 && items.length > 0) {
    items = addQuantityToItem(items, localItems);
  }

  return <ItemList items={items} />;
};

ProductSearchContainer.propTypes = {
  searchVal: string,
};

ProductSearchContainer.defaultProps = {
  searchVal: '',
};

export default ProductSearchContainer;
