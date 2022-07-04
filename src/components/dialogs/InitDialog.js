import React, {
  useState,
  useEffect,
  useMemo,
  useContext,
} from 'react';
import AppContext from '~contexts/AppContext';
import ProductItemDialog from './ProductItemDialog';
import ComplementaryDialog from './ComplementaryDialog/ComplementaryDialog';
import { useLazyQuery } from '@apollo/client';
import {
  GET_ITEM_VARIANTS,
  GET_UPSELL,
  GET_ITEMS_ALLERGY,
} from '../../graphql/queries';
import { getExistingItem } from '~utils/uniqueOrderCheck';

const InitDialog = ({
  selectedProduct,
  setSelectedProduct,
}) => {
  const {
    state: {
      items: { localItems },
    },
    actions: { addItem, editItem },
  } = useContext(AppContext);

  const [showUpsell, setShowUpsell] = useState(true);
  const [variants, setVariants] = useState([]);
  const [allergies, setAllergies] = useState([]);

  const [
    selectedComplementary,
    setSelectedComplementary,
  ] = useState(null);

  const [getUpSell, { data: upSellData }] = useLazyQuery(
    GET_UPSELL
  );

  const upSellItems = useMemo(() => {
    if (!upSellData) return {};

    let categorisedUpsells = {};
    for (const upsell of upSellData.itemsUpsell) {
      const { productGroup } = upsell;
      categorisedUpsells = {
        ...categorisedUpsells,
        [productGroup.name]: categorisedUpsells[
          productGroup.name
        ]
          ? [
              ...categorisedUpsells[productGroup.name],
              upsell,
            ]
          : [upsell],
      };
    }
    return categorisedUpsells;
  }, [upSellData]);

  const [getVariants] = useLazyQuery(GET_ITEM_VARIANTS, {
    onCompleted: data =>
      data?.itemVariants.itemVariants &&
      setVariants(data?.itemVariants.itemVariants),
  });

  const [getItemAllergy] = useLazyQuery(GET_ITEMS_ALLERGY, {
    fetchPolicy: 'network-only',
    onCompleted: data =>
      data?.itemsAllergy &&
      setAllergies(data?.itemsAllergy),
  });

  useEffect(() => {
    if (selectedProduct) {
      getItemAllergy({
        variables: { itemId: selectedProduct?.id },
      });
      getVariants({
        variables: { itemId: selectedProduct?.id },
      });
      getUpSell({
        variables: { itemId: selectedProduct?.id },
      });
    }
  }, [selectedProduct]);

  const saveToOrder = product => {
    const existingItem = getExistingItem(
      localItems,
      product
    );
    if (existingItem) {
      const updatedProduct = {
        ...existingItem,
        quantity: existingItem.quantity + product.quantity,
      };
      editItem(updatedProduct);
    } else {
      addItem(product);
    }
  };

  const handleProductSubmit = (id, values, item) => {
    saveToOrder({
      ...values,
      id,
    });
    if (Object.keys(upSellItems).length > 0 && showUpsell) {
      setSelectedComplementary(item);
    } else {
      setSelectedProduct(null);
    }
  };

  const closeModals = () => {
    setSelectedProduct(null);
    setSelectedComplementary(null);
    setShowUpsell(true);
  };

  return (
    <>
      <ProductItemDialog
        selectedProduct={selectedProduct}
        allergies={allergies}
        variants={variants}
        open={true}
        onClose={closeModals}
        onSubmit={handleProductSubmit}
      />
      <ComplementaryDialog
        open={
          selectedComplementary !== null &&
          Object.keys(upSellItems).length > 0
        }
        onClose={closeModals}
        upSellItems={showUpsell ? upSellItems : {}}
      />
    </>
  );
};

export default InitDialog;
