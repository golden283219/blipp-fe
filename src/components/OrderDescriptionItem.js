import React, { useState, useEffect } from 'react';
import { object, func, string } from 'prop-types';
import {
  Typography,
  IconButton,
  Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import EditOrderDialog from './dialogs/EditOrderDialog';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import EditIcon from '@material-ui/icons/Edit';
import allergyIcon from '../images/Allergy.svg';
import specialIcon from '../images/Special.svg';
import SpiceIcons from '../components/SpiceIcons';

const useStyles = makeStyles(theme => ({
  cardContainer: {
    margin: '12px 0px',
  },
  textContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  variantText: {
    color: theme.palette.primary.main,
    marginRight: 4,
  },
  title: {
    fontWeight: 'bold',
  },
  titleIcon: {
    marginLeft: 4,
  },
  bottomContainer: {
    paddingTop: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  QuantityContainer: {
    justifyContent: 'space-between',
    display: 'flex',
    width: '110px',
  },
  quantityIcon: {
    padding: 0,
  },
  editIcon: {
    padding: theme.spacing(0.5),
  },
}));

const OrderDescriptionItem = ({
  handleQuantityChange,
  formatPrice,
  product,
}) => {
  const {
    localId,
    name,
    totalPrice,
    specialRequest,
    quantity,
    variants,
    spicy,
  } = product;

  const styles = useStyles();
  const [openEdit, setOpenEdit] = useState(false);
  const [variantText, setVariantText] = useState(null);
  const [showAllergyIcon, setShowAllergyIcon] = useState(
    false
  );

  const handleOpenEditDialog = () => {
    setOpenEdit(!openEdit);
  };
  useEffect(() => {
    if (Object.keys(variants).length === 0) {
      setVariantText(null);
    } else {
      Object.values(variants).forEach(variant => {
        const selectedOption = variant.options.find(
          option => option.checked
        );
        setVariantText(
          selectedOption ? selectedOption.name : null
        );
      });
    }
    if (product.allergies.length > 0) {
      const checkedAllergy = product.allergies.find(
        allergy => allergy.checked
      );
      setShowAllergyIcon(checkedAllergy ? true : false);
    }
  }, [product]);

  return (
    <>
      <Box className={styles.cardContainer}>
        <Box className={styles.textContainer}>
          <Box display="flex">
            {variantText && (
              <Typography
                variant="body1"
                className={styles.variantText}
              >
                ({variantText})
              </Typography>
            )}
            <Typography
              variant="body1"
              className={styles.title}
            >
              {name}
            </Typography>
            {spicy && <SpiceIcons spiceLevel={spicy} />}
            {showAllergyIcon && (
              <img
                className={styles.titleIcon}
                src={allergyIcon}
                alt="allergy icon"
              />
            )}

            {specialRequest && (
              <img
                className={styles.titleIcon}
                src={specialIcon}
                alt="special icon"
              />
            )}
          </Box>
          <IconButton
            className={styles.editIcon}
            id={localId}
            onClick={handleOpenEditDialog}
          >
            <EditIcon />
          </IconButton>
        </Box>
        <Box className={styles.bottomContainer}>
          <Box className={styles.QuantityContainer}>
            <IconButton
              className={styles.quantityIcon}
              id={localId}
              onClick={e => {
                handleQuantityChange(
                  e,
                  quantity - 1,
                  product
                );
              }}
            >
              <RemoveIcon />
            </IconButton>
            <Typography
              className={styles.quantity}
              variant="body1"
            >
              <b>{quantity}</b>
            </Typography>
            <IconButton
              className={styles.quantityIcon}
              id={localId}
              onClick={e => {
                handleQuantityChange(
                  e,
                  quantity + 1,
                  product
                );
              }}
            >
              <AddIcon />
            </IconButton>
          </Box>

          <Box>
            <Typography
              className={styles.totalText}
              align="right"
              variant="body1"
              color="primary"
            >
              <b>{formatPrice(totalPrice * quantity)} </b>
            </Typography>
          </Box>
        </Box>
      </Box>
      {openEdit && (
        <EditOrderDialog
          open={openEdit}
          product={product}
          onClose={handleOpenEditDialog}
        />
      )}
    </>
  );
};

OrderDescriptionItem.propTypes = {
  product: object,
  currency: string,
  handleQuantityChange: func.isRequired,
};

export default OrderDescriptionItem;
