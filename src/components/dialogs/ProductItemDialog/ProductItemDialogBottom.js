import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import { func, number, bool } from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import AppContext from '~contexts/AppContext';
import AddSubtract from '../../AddSubtract';

const useStyles = makeStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(3, 2),
  },
  paper: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderRadius: theme.borderRadius.main,
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    zIndex: theme.zIndex.mobileStepper,
  },
}));

const ProductItemDialogBottom = ({
  handleQuantityChange,
  onSubmit,
  totalPrice,
  quantity,
  disabled,
}) => {
  const { formatPrice, isRestaurantOpen } = useContext(
    AppContext
  );
  const styles = useStyles();
  const { t } = useTranslation();
  return (
    <Paper square elevation={5} className={styles.paper}>
      <DialogActions className={styles.root}>
        <AddSubtract
          onChange={handleQuantityChange}
          quantity={quantity}
        />
        <Button
          autoFocus
          variant="contained"
          onClick={onSubmit}
          size="large"
          color="primary"
          fullWidth
          disabled={disabled || !isRestaurantOpen}
        >
          {isRestaurantOpen
            ? `${t('Add')} - ${formatPrice(
                totalPrice * quantity
              )}`
            : t('closedForOrder')}
        </Button>
      </DialogActions>
    </Paper>
  );
};

ProductItemDialogBottom.propTypes = {
  handleQuantityChange: func.isRequired,
  totalPrice: number,
  quantity: number,
  onSubmit: func.isRequired,
  disabled: bool,
};

ProductItemDialogBottom.defaultProps = {
  disabled: false,
  quantity: 0,
  totalPrice: 0,
};

export default ProductItemDialogBottom;
