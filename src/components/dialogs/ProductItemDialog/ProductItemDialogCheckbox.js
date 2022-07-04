import React from 'react';
import {
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import { bool, func, string, number } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  label: {
    width: '100%',
  },
}));

const ProductItemDialogCheckbox = ({
  id,
  handleChange,
  name,
  displayName,
  price,
  checked,
  disabled,
}) => {
  const styles = useStyles();
  const NameLabel = () => (
    <Typography>{displayName ?? name}</Typography>
  );

  return (
    <FormControlLabel
      classes={{
        label: styles.label,
      }}
      control={
        <Checkbox
          id={id}
          checked={checked}
          onChange={handleChange}
          name={name}
          color="primary"
          value={price}
          disabled={disabled}
        />
      }
      label={
        price ? (
          <Grid container justify="space-between">
            <Grid item>
              <NameLabel />
            </Grid>
            <Grid item>
              <Typography variant="body2">
                <i>{`+ ${price} kr`}</i>
              </Typography>
            </Grid>
          </Grid>
        ) : (
          <NameLabel />
        )
      }
    />
  );
};

ProductItemDialogCheckbox.propTypes = {
  id: string.isRequired,
  handleChange: func.isRequired,
  name: string.isRequired,
  displayName: string,
  price: number,
  checked: bool,
  disabled: bool,
};

ProductItemDialogCheckbox.defaultProps = {
  checked: false,
  price: 0,
  disabled: false,
};

export default ProductItemDialogCheckbox;
