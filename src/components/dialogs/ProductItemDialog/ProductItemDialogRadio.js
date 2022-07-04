import React from 'react';
import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Grid,
} from '@material-ui/core';
import {
  func,
  string,
  number,
  arrayOf,
  shape,
} from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  label: {
    width: '100%',
  },
});

const ProductItemDialogRadio = ({
  handleChange,
  value,
  items,
  name,
}) => {
  const styles = useStyles();
  const { t } = useTranslation();
  return (
    <FormControl
      component="fieldset"
      classes={{
        root: styles.root,
      }}
    >
      <RadioGroup
        name={name}
        aria-label={name}
        value={value}
        onChange={handleChange}
      >
        {items.map(item => {
          return (
            <FormControlLabel
              key={item.id}
              classes={{
                label: styles.label,
              }}
              value={item.id}
              name={item.name}
              checked={item.checked}
              control={<Radio id={name} color="primary" />}
              label={
                item.price ? (
                  <Grid container justify="space-between">
                    <Grid item>
                      <Typography variant="body2">
                        {item.name}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body2">
                        <i>
                          {`${item.price} ${t('Currency')}`}
                        </i>
                      </Typography>
                    </Grid>
                  </Grid>
                ) : (
                  <Typography variant="body2">
                    {item.name}
                  </Typography>
                )
              }
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};

ProductItemDialogRadio.propTypes = {
  handleChange: func.isRequired,
  name: string,
  items: arrayOf(
    shape({
      name: string,
      price: number,
      id: number,
    })
  ).isRequired,
  value: string, // TODO: Not a string anymore, update accordingly
};

ProductItemDialogRadio.defaultProps = {
  name: '',
  value: '',
};

export default ProductItemDialogRadio;
