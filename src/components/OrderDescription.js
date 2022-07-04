import React, { useMemo } from 'react';
import { array, func, string } from 'prop-types';
import {
  List,
  Box,
  Typography,
  ListItem,
  CardContent,
} from '@material-ui/core';
import OrderDescriptionItem from './OrderDescriptionItem';
import { makeStyles } from '@material-ui/styles';
import DefaultCard from './DefaultCard';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
  list: {
    padding: 0,
  },
  listItem: {
    width: '100%',
    height: '100%',
    paddingLeft: 0,
    paddingRight: 0,
    marginBottom: 8,
  },
  cardContent: {
    '&:last-child': {
      paddingBottom: 4,
    },
  },
  categoryName: {
    color: 'rgba(0, 0, 0, 0.54)',
    marginBottom: theme.spacing(1),
  },
  divider: {
    marginBottom: theme.spacing(1),
  },
}));

const OrderDescription = ({
  order,
  formatPrice,
  handleQuantityChange,
}) => {
  const styles = useStyles();

  const categorisedOrder = useMemo(() => {
    return order.reduce((acc, item) => {
      const { productGroup } = item;
      acc = {
        ...acc,
        [productGroup.name]: acc[productGroup.name]
          ? [...acc[productGroup.name], item]
          : [item],
      };
      return acc;
    }, {});
  }, [order]);

  return (
    <List className={styles.list}>
      {Object.keys(categorisedOrder).map(category => (
        <ListItem
          dense
          className={styles.listItem}
          key={category}
        >
          <DefaultCard>
            <CardContent className={styles.cardContent}>
              <Typography className={styles.categoryName}>
                {category}
              </Typography>
              {categorisedOrder[category].map(
                (product, i) => (
                  <Box key={product.localId}>
                    <OrderDescriptionItem
                      product={product}
                      formatPrice={formatPrice}
                      handleQuantityChange={
                        handleQuantityChange
                      }
                    />
                    {categorisedOrder[category].length !==
                      i + 1 && (
                      <Divider
                        variant="middle"
                        className={styles.divider}
                      />
                    )}
                  </Box>
                )
              )}
            </CardContent>
          </DefaultCard>
        </ListItem>
      ))}
    </List>
  );
};

OrderDescription.propTypes = {
  order: array.isRequired,
  handleQuantityChange: func.isRequired,
  formatPrice: func.isRequired,
};

export default OrderDescription;
