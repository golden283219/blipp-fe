import React, { useMemo } from 'react';
import {
  DriveEta,
  Motorcycle,
  Restaurant,
} from '@material-ui/icons';
import {
  Box,
  Button,
  Grid,
  makeStyles,
} from '@material-ui/core';
import ActionDialog from './ActionDialog';
import { useTranslation } from 'react-i18next';
import { DeliveryType } from '~types';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1, 1, 1, 0),
  },
}));

export default ({
  handleSelectedItem,
  open,
  restaurant,
}) => {
  const styles = useStyles();
  const { t } = useTranslation();
  const handleButtonPress = type => {
    handleSelectedItem(type);
  };

  const deliveries = useMemo(() => {
    const returnArr = [];
    if (restaurant.reservationStatus) {
      returnArr.push({
        text: t('TableOrder'),
        icon: <Restaurant color="primary" />,
        type: DeliveryType.RESERVATION,
      });
    }
    if (restaurant.takeawayStatus) {
      returnArr.push({
        text: t('Takeaway'),
        icon: <Motorcycle color="primary" />,
        type: DeliveryType.TAKEAWAY,
      });
    }
    if (restaurant.deliveryStatus) {
      returnArr.push({
        text: t('Delivery'),
        icon: <DriveEta color="primary" />,
        type: DeliveryType.DELIVERY,
      });
    }
    return returnArr;
  }, [restaurant]);

  return (
    <ActionDialog
      title={deliveries.length > 0 && t('DeliveryType')}
      description={
        deliveries.length > 0
          ? t('DeliveryTypeDesc')
          : t('NoDeliveryTypes')
      }
      open={open}
    >
      <Grid container spacing={1}>
        {deliveries.map(delivery => (
          <Grid item xs={12} md key={delivery.text}>
            <Button
              className={styles.root}
              onClick={() =>
                handleButtonPress(delivery.type)
              }
            >
              {delivery.icon}
              <Box ml={0.5}>{delivery.text}</Box>
            </Button>
          </Grid>
        ))}
      </Grid>
    </ActionDialog>
  );
};
