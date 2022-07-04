import React, { useState } from 'react';
import InitDialog from './dialogs/InitDialog';
import { makeStyles } from '@material-ui/styles';
import { List, Box } from '@material-ui/core';
import ProductItem from './ProductItem';
import { array, func, object } from 'prop-types';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.margins.marginToHeader,
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
  },
  listContainer: {
    width: '100%',
    maxWidth: theme.breakpoints.values.lg,
  },
  list: {
    [theme.breakpoints.up('lg')]: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
    },
  },
}));

const ItemList = ({ items }) => {
  const [selectedProduct, setSelectedProduct] = useState(
    null
  );
  const styles = useStyles();
  return (
    <Box className={styles.container}>
      {selectedProduct && (
        <InitDialog
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
        />
      )}
      <Box className={styles.listContainer}>
        <List className={styles.list}>
          {items.map(item => (
            <ProductItem
              item={item}
              key={item.id}
              onClick={() => setSelectedProduct(item)}
            />
          ))}
        </List>
      </Box>
    </Box>
  );
};
ItemList.propTypes = {
  items: array,
};

export default ItemList;
