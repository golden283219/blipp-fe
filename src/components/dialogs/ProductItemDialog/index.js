import React, { useState, useEffect } from 'react';
import { Dialog, Box } from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import {
  bool,
  func,
  string,
  number,
  arrayOf,
  shape,
} from 'prop-types';
import ProductItemDialogTitle from './ProductItemDialogTitle';
import { useTranslation } from 'react-i18next';
import Divider from '@material-ui/core/Divider';
import ProductItemDialogBottom from './ProductItemDialogBottom';
import TextField from '@material-ui/core/TextField';
import ProductItemDialogCollapse from './ProductItemDialogCollapse';
import { makeStyles } from '@material-ui/core/styles';
import AllergyDialogCollapse from './AllergyDialogCollapse';
import { useSetItemValues } from '../../../contexts/hooks/useSetItemValues';
import { valueChangeHandler } from '~utils/orderHelper';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: '100vw',
    height: '100vh',
    [theme.breakpoints.up('lg')]: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  dialogPaper: {
    [theme.breakpoints.up('lg')]: {
      width: '40%',
      height: '55%',
    },
  },
  specialRequest: {
    marginTop: theme.spacing(2),
  },
  specialRequestInput: {
    backgroundColor: theme.palette.secondary.main,
  },
  dialogContent: {
    padding: theme.spacing(2),
  },
  topDivider: {
    marginBottom: theme.spacing(2),
  },
  bottomDivider: {
    marginTop: theme.spacing(2),
  },
}));

const ProductItemDialog = ({
  allergies,
  open,
  variants,
  onClose,
  onSubmit,
  selectedProduct,
}) => {
  const styles = useStyles();
  const { t } = useTranslation();
  const theme = useTheme();
  const fullScreen = useMediaQuery(
    theme.breakpoints.down('lg')
  );

  const [expanded, setExpanded] = useState([]);
  const [disableBtn, setDisableBtn] = useState(0);
  const showDividers =
    variants.length > 0 || allergies.length > 0;
  const [values, setValues] = useSetItemValues(
    selectedProduct,
    variants,
    allergies,
    1
  );

  useEffect(() => {
    setDisableBtn(0);
    if (variants) {
      variants.map(variant => {
        setExpanded(prevState => [
          ...prevState,
          variant.name,
        ]);

        if (!variant.isMultiSelect) {
          setDisableBtn(disableBtn => disableBtn + 1);
        }
      });
    }
  }, [selectedProduct, variants, allergies]);

  // - Handlers
  const handleToggleExpanded = panel => (_, isExpanded) => {
    if (isExpanded) {
      setExpanded([panel, ...expanded]);
    } else {
      setExpanded(expanded.filter(e => e !== panel));
    }
  };

  const handleQuantityChange = value => {
    setValues({
      ...values,
      quantity: value,
    });
  };
  const handleValueChange = ({ target }) => {
    const {
      changedValue,
      changedNumber,
    } = valueChangeHandler(values, target, disableBtn);
    setValues(changedValue);
    setDisableBtn(changedNumber);
  };

  const handleSubmit = () => {
    onSubmit(selectedProduct.id, values);
  };
  if (!values) return null;

  return (
    <Box className={styles.container}>
      <Dialog
        aria-labelledby="customized-dialog-title"
        open={open}
        fullScreen={fullScreen}
        classes={{ paper: styles.dialogPaper }}
      >
        <ProductItemDialogTitle
          onClose={onClose}
          title={selectedProduct.name}
          subTitle={selectedProduct.description}
          allergies={allergies}
          price={selectedProduct.price}
          spiceLevel={selectedProduct.spicy}
        />
        <DialogContent className={styles.dialogContent}>
          {showDividers && (
            <Divider
              variant="middle"
              className={styles.topDivider}
            />
          )}
          {values?.allergies.length > 0 && (
            <AllergyDialogCollapse
              currentExpanded={expanded}
              toggleExpanded={handleToggleExpanded}
              handleChange={handleValueChange}
              values={values.allergies}
              expanded={'allergies'}
            />
          )}
          {variants &&
            variants.map(variant => {
              const {
                id,
                name,
                itemVariantOptions,
                isMultiSelect,
                isRequired,
              } = variant;
              return (
                <ProductItemDialogCollapse
                  key={id}
                  currentExpanded={expanded}
                  toggleExpanded={handleToggleExpanded}
                  handleChange={handleValueChange}
                  expanded={name}
                  items={
                    values.variants[name]
                      ? values.variants[name].options
                      : itemVariantOptions
                  }
                  name={name}
                  multiSelect={isMultiSelect}
                />
              );
            })}

          {showDividers && (
            <Divider
              variant="middle"
              className={styles.bottomDivider}
            />
          )}
          <TextField
            multiline
            fullWidth
            size="small"
            rows={3}
            InputProps={{
              className: styles.specialRequestInput,
            }}
            className={styles.specialRequest}
            label={t('SpecialRequests')}
            variant="outlined"
            name="specialRequest"
            value={values.specialRequest}
            onChange={handleValueChange}
          />
        </DialogContent>
        <ProductItemDialogBottom
          handleQuantityChange={handleQuantityChange}
          quantity={values.quantity}
          onSubmit={handleSubmit}
          totalPrice={values.totalPrice}
          disabled={disableBtn > 0}
        />
      </Dialog>
    </Box>
  );
};

ProductItemDialog.propTypes = {
  open: bool,
  onClose: func.isRequired,
  onSubmit: func.isRequired,
  allergies: arrayOf(
    shape({
      name: string,
      id: number,
      checked: bool,
    })
  ),
  variants: arrayOf(
    shape({
      name: string,
      id: number,
      isMultiSelect: bool,
      items: arrayOf(
        shape({ name: string, price: number, id: number })
      ),
    })
  ),
  selectedProduct: shape({
    id: number,
    name: string,
    description: string,
    diet: string,
    price: number,
    upsellIds: arrayOf(number),
  }),
};

ProductItemDialog.defaultProps = {
  id: 0,
  name: '',
  description: '',
  diet: '',
  price: 0,
  open: false,
  allergies: [],
  variants: [],
  selectedProduct: {},
};

export default ProductItemDialog;
