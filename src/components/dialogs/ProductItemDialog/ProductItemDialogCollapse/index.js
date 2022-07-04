import React from 'react';
import { FormGroup } from '@material-ui/core';
import {
  func,
  string,
  number,
  arrayOf,
  shape,
  oneOfType,
  bool,
} from 'prop-types';
import ProductItemDialogCheckbox from '../ProductItemDialogCheckbox';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { makeStyles } from '@material-ui/core/styles';
import ProductItemDialogRadio from '../ProductItemDialogRadio';
import Divider from '@material-ui/core/Divider';
import CollapseHeader from './CollapseHeader';
import theme from '../../../../styles/theme';

const useStyles = makeStyles(() => ({
  formGroup: {
    width: '100%',
  },
  Accordion: {
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

const ProductItemDialogCollapse = ({
  expanded,
  handleChange,
  toggleExpanded,
  currentExpanded,
  items,
  name,
  multiSelect,
}) => {
  const styles = useStyles();
  const itemsTotalPrice =
    items &&
    typeof items !== 'string' &&
    items.reduce((total, e) => {
      return total + (items[e.name] ? e.price : 0);
    }, 0);

  return (
    <Accordion
      square
      expanded={currentExpanded.includes(expanded)}
      onChange={toggleExpanded(expanded)}
      elevation={3}
      className={styles.expansionPanel}
    >
      <CollapseHeader
        price={
          itemsTotalPrice
            ? itemsTotalPrice * items.amount
            : 0
        }
        expanded={expanded}
        title={expanded}
      />
      {currentExpanded.includes(expanded) && (
        <Divider variant="middle" />
      )}
      <AccordionDetails>
        {multiSelect ? (
          <FormGroup className={styles.formGroup}>
            {items.map(item => {
              return (
                <ProductItemDialogCheckbox
                  {...item}
                  key={item.id}
                  id={name}
                  handleChange={handleChange}
                  checked={item.checked}
                />
              );
            })}
          </FormGroup>
        ) : (
          <ProductItemDialogRadio
            value={items.selected}
            name={name}
            items={items}
            handleChange={handleChange}
          />
        )}
      </AccordionDetails>
    </Accordion>
  );
};

ProductItemDialogCollapse.propTypes = {
  name: string,
  items: arrayOf(
    shape({
      name: string,
      price: number,
      id: number,
    })
  ).isRequired,
  expanded: string.isRequired,
  currentExpanded: arrayOf(oneOfType([string, shape()]))
    .isRequired,
  handleChange: func.isRequired,
  toggleExpanded: func.isRequired,
  multiSelect: bool,
};

ProductItemDialogCollapse.defaultProps = {
  multiSelect: false,
  name: '',
};

export default ProductItemDialogCollapse;
