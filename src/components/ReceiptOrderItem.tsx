import React from 'react';
import { Box, Grid, makeStyles } from '@material-ui/core';
import { ItemsType, VariantType } from '~types';

interface ReceiptOrderItemProps {
  item: ItemsType;
  formatPrice: (price: number) => string;
}

const useStyles = makeStyles({
  container: {
    overflow: 'hidden',
    margin: '8px 0px',
  },
  title: {
    '& p': {
      fontSize: 14,
      margin: 4,
    },
  },
  options: {
    paddingLeft: 24,
    '& p': {
      fontSize: 14,
      margin: 4,
    },
  },
});

const showItemPrice = (
  variants: VariantType[],
  itemPrice: number
) => {
  const variantHasPrice = variants.some(
    variant => variant.price && variant.price > 0
  );
  return !(variantHasPrice && itemPrice === 0);
};

const ReceiptOrderItem: React.FC<ReceiptOrderItemProps> = ({
  item: {
    name,
    price: itemPrice,
    quantity,
    variants,
    allergies,
  },
  formatPrice,
}) => {
  const style = useStyles();

  return (
    <Box className={style.container}>
      <Grid
        container
        direction="row"
        justify="space-between"
        className={style.title}
      >
        <p>{`${quantity} x ${name}`}</p>
        {showItemPrice(variants, itemPrice) && (
          <p>{formatPrice(itemPrice * quantity)}</p>
        )}
      </Grid>
      <Box className={style.options}>
        {variants &&
          variants.map(variant => {
            const { name, price: variantPrice } = variant;

            return (
              <Grid
                container
                direction="row"
                justify="space-between"
                className={style.title}
                key={name}
              >
                <p>{`+ ${name}`}</p>
                {variantPrice > 0 && (
                  <p>
                    {formatPrice(variantPrice * quantity)}
                  </p>
                )}
              </Grid>
            );
          })}

        {allergies &&
          allergies.map(allergy => (
            <p key={allergy}>{`- ${allergy}`}</p>
          ))}
      </Box>
    </Box>
  );
};

export default ReceiptOrderItem;
