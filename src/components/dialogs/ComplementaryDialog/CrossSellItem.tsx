import {
  Accordion,
  AccordionSummary,
  FormControlLabel,
  Checkbox,
  AccordionDetails,
  Box,
  Typography,
  makeStyles,
  FormGroup,
} from '@material-ui/core';

import theme from '../../../styles/theme';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';
import { GET_ITEMS_ALLERGY } from '../../../graphql/queries';
import { CrossSellItemType } from '~types';
import AddSubtract from '../../AddSubtract';
import { useSetItemValues } from '../../../contexts/hooks/useSetItemValues.js';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ProductItemDialogCheckbox from '../ProductItemDialog/ProductItemDialogCheckbox';
import ProductItemDialogRadio from '../ProductItemDialog/ProductItemDialogRadio';
import { valueChangeHandler } from '../../../utils/orderHelper';
import AllergyDesc from '../../AllergyDesc';

interface CrossSellItemProps {
  item: CrossSellItemType;
  formatPrice: (price: number) => string;
  handleAddItemsToOrder: (
    callback: (prevstate: any) => void
  ) => void;
  handleIsLoading: (loading: boolean) => void;
}

const useStyles = makeStyles(() => ({
  formGroup: {
    width: '100%',
  },
  accordion: {
    '&:before': {
      border: 'none',
    },
    '&.MuiExpansionPanel-root:before': {
      display: 'none',
    },
    marginBottom: 12,
    borderRadius: theme.borderRadius.main,
  },
}));

const CrossSellItem: React.FC<CrossSellItemProps> = ({
  item,
  handleAddItemsToOrder,
  formatPrice,
  handleIsLoading,
}) => {
  const { t } = useTranslation();
  const styles = useStyles();
  const [openUpsell, setOpenUpsell] = useState(false);
  const [allergies, setAllergies] = useState([]);
  const { loading } = useQuery(GET_ITEMS_ALLERGY, {
    variables: { itemId: item?.id },
    onCompleted: data => {
      setAllergies(data.itemsAllergy);
      handleIsLoading(false);
    },
  });

  const [values, setValues] = useSetItemValues(
    item,
    item.itemVariants,
    allergies,
    0,
    true
  );

  const calcStartingPrice = (item: CrossSellItemType) => {
    if (!item.itemVariants || item.price !== 0) {
      return item.price;
    }
    const prices = item.itemVariants[0].itemVariantOptions.map(
      option => option.price
    );
    return Math.min(...prices);
  };

  const addQuantityToValues = (quantity: number) =>
    setValues({ ...values, quantity });

  const handleValueChange = ({ target }: any) => {
    const { changedValue } = valueChangeHandler(
      values,
      target
    );
    setValues(changedValue);
  };

  const handleOpenProduct = (open: boolean) => {
    if (!open) {
      addQuantityToValues(0);
      return;
    }
    if (values.quantity === 0) {
      addQuantityToValues(1);
      return;
    }
  };

  useEffect(() => {
    if (values) {
      handleAddItemsToOrder((prevstate: any) => {
        return {
          ...prevstate,
          [`${values.id}`]: values,
        };
      });
    }
  }, [values]);

  if (loading || !values) return null;
  return (
    <Accordion
      square
      expanded={openUpsell}
      onChange={() => {
        setOpenUpsell(!openUpsell);
        handleOpenProduct(!openUpsell);
      }}
      elevation={3}
      className={styles.accordion}
    >
      <AccordionSummary>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <FormControlLabel
            aria-label={values.name}
            onClick={event => {
              event.stopPropagation();
              handleOpenProduct(!openUpsell);
            }}
            onFocus={event => event.stopPropagation()}
            control={
              <Checkbox
                color="primary"
                checked={openUpsell}
                onChange={() => setOpenUpsell(!openUpsell)}
              />
            }
            label={values.name}
          />
          <Typography color="primary">
            {formatPrice(calcStartingPrice(item))}
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box width="100%">
          {values?.description && (
            <Typography variant="body2" gutterBottom>
              {values?.description}
            </Typography>
          )}
          {values.allergies?.length > 0 && (
            <AllergyDesc allergies={allergies} />
          )}
          {values.allergies.length > 0 && (
            <Accordion
              square
              elevation={3}
              className={styles.accordion}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography variant="subtitle1">
                  {t('Allergies')}
                </Typography>
              </AccordionSummary>

              <AccordionDetails>
                <FormGroup className={styles.formGroup}>
                  {values.allergies.map(allergy => {
                    const {
                      id,
                      name,
                      checked,
                      removable,
                    } = allergy;
                    const allergytext = removable
                      ? t(name)
                      : `${t('NonRemovableAllergy')} ${t(
                          name
                        )}`;
                    return (
                      <ProductItemDialogCheckbox
                        key={id}
                        name={name}
                        displayName={allergytext}
                        handleChange={handleValueChange}
                        checked={checked}
                        disabled={!removable}
                        id={'allergies'}
                      />
                    );
                  })}
                </FormGroup>
              </AccordionDetails>
            </Accordion>
          )}
          {Object.keys(values.variants).length > 0 &&
            Object.values(values.variants).map(variant => {
              const {
                name,
                options,
                isMultiSelect,
                isRequired,
              } = variant;
              return (
                <Accordion
                  key={name}
                  square
                  elevation={3}
                  className={styles.accordion}
                  defaultExpanded={isRequired}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                  >
                    <Typography variant="subtitle1">
                      {name}
                    </Typography>
                  </AccordionSummary>

                  <AccordionDetails>
                    {isMultiSelect ? (
                      <FormGroup
                        className={styles.formGroup}
                      >
                        {options.map(option => {
                          return (
                            <ProductItemDialogCheckbox
                              {...option}
                              key={option.id}
                              id={name}
                              handleChange={
                                handleValueChange
                              }
                              checked={option.checked}
                            />
                          );
                        })}
                      </FormGroup>
                    ) : (
                      <ProductItemDialogRadio
                        name={name}
                        items={variant.options}
                        handleChange={handleValueChange}
                      />
                    )}
                  </AccordionDetails>
                </Accordion>
              );
            })}
          <AddSubtract
            onChange={addQuantityToValues}
            quantity={1}
          />
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default CrossSellItem;
