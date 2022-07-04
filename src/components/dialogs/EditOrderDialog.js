import React, {
  useState,
  useEffect,
  useContext,
} from 'react';
import { bool, func, object } from 'prop-types';
import {
  Typography,
  Box,
  Dialog,
  DialogContent,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useTranslation } from 'react-i18next';
import ProductItemDialogTitle from './ProductItemDialog/ProductItemDialogTitle';
import ProductItemDialogCollapse from './ProductItemDialog/ProductItemDialogCollapse';
import AllergyDialogCollapse from './ProductItemDialog/AllergyDialogCollapse';
import ActionDialog from '../ActionDialog.tsx';
import AppContext from '~contexts/AppContext';
import { valueChangeHandler } from '~utils/orderHelper';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    position: 'absolute',
    height: '100vh',
    padding: theme.spacing(2),
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
  specialRequestInput: {
    backgroundColor: theme.palette.secondary.main,
  },
  specialRequest: {
    marginTop: theme.spacing(2),
  },
  dialogContent: {
    padding: theme.spacing(2),
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: theme.spacing(2),
  },
  button: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(2),
    borderRadius: '4px',
    textAlign: 'center',
  },
}));

const EditOrderDialog = ({ open, onClose, product }) => {
  const {
    actions: { editItem },
  } = useContext(AppContext);
  const { t } = useTranslation();
  const styles = useStyles();
  const [expanded, setExpanded] = useState([]);
  const [values, setValues] = useState(product);
  const [
    showConfirmDialog,
    setShowConfirmDialog,
  ] = useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(
    theme.breakpoints.down('lg')
  );

  useEffect(() => {
    setValues(product);
  }, [product]);

  useEffect(() => {
    if (values.variants) {
      Object.values(values.variants).map(variant => {
        setExpanded(prevState => [
          ...prevState,
          variant.name,
        ]);
      });
    }
  }, [values]);

  // - Handlers
  const handleToggleExpanded = panel => (_, isExpanded) => {
    if (isExpanded) {
      setExpanded([panel, ...expanded]);
    } else {
      setExpanded(expanded.filter(e => e !== panel));
    }
  };

  const handleValueChange = ({ target }) => {
    const { changedValue } = valueChangeHandler(
      values,
      target
    );
    setValues(changedValue);
  };

  const toggleDeleteGoBackDialog = () =>
    setShowConfirmDialog(prevState => !prevState);

  const productStatesIsEqual = () =>
    JSON.stringify(product) === JSON.stringify(values);

  const handleClose = () => {
    if (productStatesIsEqual()) {
      onClose();
    } else {
      toggleDeleteGoBackDialog();
    }
  };

  const confirmClose = () => {
    setValues(product);
    toggleDeleteGoBackDialog();
    onClose();
  };

  const handleSubmit = () => {
    editItem(values);
    onClose();
  };

  return (
    <Box className={styles.container}>
      <Dialog
        open={open}
        fullScreen={fullScreen}
        classes={{ paper: styles.dialogPaper }}
      >
        <ProductItemDialogTitle
          onClose={handleClose}
          title={values.name}
          subTitle={values.description}
        />
        <DialogContent className={styles.dialogContent}>
          {values.variants &&
            Object.values(values.variants).map(variant => {
              const {
                id,
                name,
                options,
                isMultiSelect,
              } = variant;
              return (
                <ProductItemDialogCollapse
                  key={id}
                  currentExpanded={expanded}
                  toggleExpanded={handleToggleExpanded}
                  handleChange={handleValueChange}
                  expanded={name}
                  items={options}
                  name={name}
                  multiSelect={isMultiSelect}
                />
              );
            })}
          {values.allergies.length > 0 && (
            <AllergyDialogCollapse
              currentExpanded={expanded}
              toggleExpanded={handleToggleExpanded}
              handleChange={handleValueChange}
              values={values.allergies}
              expanded={'allergies'}
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
          <Box className={styles.buttonContainer}>
            <Box
              className={styles.button}
              onClick={handleSubmit}
            >
              <Typography variant="body1" color="secondary">
                {t('Confirm')}
              </Typography>
            </Box>
          </Box>
          <ActionDialog
            open={showConfirmDialog}
            title={t('EditItemConfirmation')}
            firstActionText={t('No')}
            secondActionText={t('Yes')}
            handleFirstAction={toggleDeleteGoBackDialog}
            handleSecondAction={confirmClose}
            onBackdropClick={toggleDeleteGoBackDialog}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

EditOrderDialog.propTypes = {
  open: bool.isRequired,
  onClose: func.isRequired,
  product: object.isRequired,
};

export default EditOrderDialog;
