import React, { useContext } from 'react';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { func, string, number, array } from 'prop-types';
import Grid from '@material-ui/core/Grid';

import SpiceIcons from '../../SpiceIcons';
import AppContext from '~contexts/AppContext';
import AllergyDesc from '../../AllergyDesc';

const useStyles = makeStyles(theme => ({
  root: {
    padding: `${theme.spacing(1.5)}px ${theme.spacing(
      2
    )}px ${theme.spacing(2)}px`,
  },
  closeButton: {
    color: theme.palette.grey[500],
    marginBottom: theme.spacing(1),
    marginLeft: '-5px',
    padding: 0,
  },
  title: {
    display: 'inline-block',
  },
}));

const ProductItemDialogTitle = ({
  title,
  subTitle,
  allergies,
  price,
  onClose,
  spiceLevel,
  ...other
}) => {
  const { formatPrice } = useContext(AppContext);
  const styles = useStyles();

  return (
    <MuiDialogTitle
      className={styles.root}
      disableTypography
      {...other}
    >
      <IconButton
        aria-label="close"
        className={styles.closeButton}
        onClick={onClose}
        size="small"
      >
        <CloseIcon />
      </IconButton>
      <Typography
        variant="h6"
        gutterBottom
        className={styles.title}
      >
        {title}
      </Typography>
      {spiceLevel && <SpiceIcons spiceLevel={spiceLevel} />}
      <Typography variant="body2" gutterBottom>
        {subTitle}
      </Typography>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="flex-end"
        wrap="nowrap"
      >
        <Grid item xs>
          {allergies?.length > 0 && (
            <AllergyDesc allergies={allergies} />
          )}
        </Grid>
        {price !== 0 && (
          <Grid item xs>
            <Typography variant="body2" align="right">
              <i>{formatPrice(price)}</i>
            </Typography>
          </Grid>
        )}
      </Grid>
    </MuiDialogTitle>
  );
};

ProductItemDialogTitle.propTypes = {
  onClose: func.isRequired,
  title: string,
  subTitle: string,
  allergies: array,
  price: number,
  spiceLevel: number,
};

ProductItemDialogTitle.defaultProps = {
  title: '',
  subTitle: '',
  price: 0,
  allergies: [],
};

export default ProductItemDialogTitle;
