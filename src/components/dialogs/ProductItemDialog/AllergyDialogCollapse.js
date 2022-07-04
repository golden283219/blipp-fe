import React from 'react';
import {
  func,
  string,
  arrayOf,
  array,
  shape,
  oneOfType,
} from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../../../styles/theme';
import { useTranslation } from 'react-i18next';
import {
  FormGroup,
  Typography,
  Divider,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ProductItemDialogCheckbox from './ProductItemDialogCheckbox';

const useStyles = makeStyles(() => ({
  formGroup: {
    width: '100%',
  },
  Accordion: {
    '&:before': {
      border: 'none',
    },
    '&.MuiAccordion-root:before': {
      display: 'none',
    },
    marginBottom: 12,
    borderRadius: theme.borderRadius.main,
  },
  expanded: {
    alignItems: 'center',
  },
}));

const AllergyDialogCollapse = ({
  expanded,
  handleChange,
  toggleExpanded,
  currentExpanded,
  values,
}) => {
  const styles = useStyles();
  const { t } = useTranslation();

  return (
    <Accordion
      square
      expanded={currentExpanded.includes(expanded)}
      onChange={toggleExpanded(expanded)}
      elevation={3}
      className={styles.Accordion}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${expanded}bh-content`}
        id={`${expanded}bh-header`}
      >
        <Typography variant="subtitle1">
          {t('Allergies')}
        </Typography>
      </AccordionSummary>
      {currentExpanded.includes(expanded) && (
        <Divider variant="middle" />
      )}
      <AccordionDetails>
        <FormGroup className={styles.formGroup}>
          {values.map(allergy => {
            const {
              id,
              name,
              checked,
              removable,
            } = allergy;
            const allergytext = removable
              ? t(name)
              : `${t('NonRemovableAllergy')} ${t(name)}`;
            return (
              <ProductItemDialogCheckbox
                key={id}
                name={name}
                displayName={allergytext}
                handleChange={handleChange}
                checked={checked}
                disabled={!removable}
                id={'allergies'}
              />
            );
          })}
        </FormGroup>
      </AccordionDetails>
    </Accordion>
  );
};

AllergyDialogCollapse.propTypes = {
  values: array.isRequired,
  expanded: string.isRequired,
  currentExpanded: arrayOf(oneOfType([string, shape()]))
    .isRequired,
  handleChange: func.isRequired,
  toggleExpanded: func.isRequired,
};

AllergyDialogCollapse.defaultProps = {
  values: [],
};

export default AllergyDialogCollapse;
