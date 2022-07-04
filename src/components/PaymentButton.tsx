import React from 'react';
import {
  Box,
  CircularProgress,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
  button: {
    margin: '8px 16px 16px 16px',
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(2),
    borderRadius: '4px',
    width: '100%',
    maxWidth: 500,
  },
  disabled: {
    backgroundColor: 'lightGrey',
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
  },
  contentContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  contentContainerDisabled: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

interface IPaymentButon {
  orderTotal: string;
  title: string;
  onClick: () => void;
  loading: boolean;
  isRestaurantOpen: boolean;
}

const PaymentButton: React.FC<IPaymentButon> = ({
  orderTotal,
  title,
  onClick,
  loading,
  isRestaurantOpen,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const ButtonContent = () =>
    isRestaurantOpen ? (
      <Box className={classes.contentContainer}>
        <Typography variant="body1" color="secondary">
          {title}
        </Typography>
        <Typography variant="body1" color="secondary">
          {orderTotal}
        </Typography>
      </Box>
    ) : (
      <Box className={classes.contentContainerDisabled}>
        <Typography variant="body1" color="secondary">
          {t('closedForOrder')}
        </Typography>
      </Box>
    );
  return (
    <Box className={classes.buttonContainer}>
      <Box
        className={`${classes.button} ${
          !isRestaurantOpen ? classes.disabled : null
        } ${loading ? classes.loading : null}`}
        onClick={() => {
          isRestaurantOpen && !loading && onClick();
        }}
      >
        {loading ? (
          <CircularProgress color="secondary" size={16} />
        ) : (
          <ButtonContent />
        )}
      </Box>
    </Box>
  );
};

export default PaymentButton;
