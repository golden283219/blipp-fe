import React from 'react';
import { useTranslation } from 'react-i18next';
import { string, array, number } from 'prop-types';
import {
  Grid,
  Typography,
  Divider,
} from '@material-ui/core';
import { timeConverter } from '../utils/formatHelper';

const Receipt = ({
  address,
  company,
  date,
  items,
  orgNr,
  paymentMethod,
  vatPercent,
}) => {
  const { t } = useTranslation();
  var _currency = '';
  const getTotal = items.reduce(
    (sum, item) => sum + item.item.price * item.quantity,
    0
  );

  return (
    <Grid container direction="column">
      <Grid
        item
        container
        direction="column"
        alignItems="center"
      >
        <Grid xs item>
          <Typography variant="h5" paragraph>
            {company}
          </Typography>
        </Grid>
        <Grid xs item>
          <Typography variant="caption">
            {address}
          </Typography>
        </Grid>
        <Grid xs item>
          <Typography variant="caption">
            {timeConverter(date)}
          </Typography>
        </Grid>
        <Grid xs item>
          <Typography variant="caption">{orgNr}</Typography>
        </Grid>
      </Grid>
      <br />
      <Divider />
      {items.map(i => {
        const { quantity, item } = i;
        const { id, name, price, currency } = item;
        _currency = currency;
        return (
          <Grid key={id} item container>
            <Grid xs item>
              <Typography variant="caption" align="left">
                {`${quantity}x ${name}`}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="caption" align="right">
                {`${price} ${_currency}`}
              </Typography>
            </Grid>
          </Grid>
        );
      })}
      <Divider />
      <br />
      <Grid item container>
        <Grid xs item>
          <Typography variant="body2" align="left">
            <b>{t('Total')}</b>
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2" align="right">
            <b>{`${getTotal} ${_currency}`}</b>
          </Typography>
        </Grid>
        <Grid item container>
          <Grid xs item>
            <Typography variant="caption" align="left">
              {`Moms ${vatPercent}%`}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="caption" align="right">
              {`${(getTotal * vatPercent) /
                100} ${_currency}`}
            </Typography>
          </Grid>
        </Grid>
        <Grid item container>
          <Grid xs item>
            <Typography variant="caption" align="left">
              {t('PaidWith')}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="caption" align="right">
              {paymentMethod}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

Receipt.propTypes = {
  address: string.isRequired,
  company: string.isRequired,
  date: string.isRequired,
  items: array.isRequired,
  orgNr: string.isRequired,
  paymentMethod: string.isRequired,
  vatPercent: number.isRequired,
};

export default Receipt;
