import React, {
  useState,
  useContext,
  useEffect,
} from 'react';
import {
  bool,
  func,
  string,
  number,
  object,
} from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  Button,
  List,
  IconButton,
  Dialog,
  DialogContent,
  DialogActions,
  CircularProgress,
  Box,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CrossSellItem from './CrossSellItem';
import AppContext from '~contexts/AppContext';
import { getExistingItem } from '~utils/uniqueOrderCheck';
import CloseIcon from '@material-ui/icons/Close';
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
  title: {
    fontWeight: 'bold',
    padding: 16,
  },
  list: {
    padding: 16,
  },
  dialogContent: {
    padding: 0,
  },
  backBtn: {
    display: 'flex',
    justifyContent: 'start',
  },
  loading: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    zIndex: 99,
  },
  root: {
    padding: '30px 8px',
  },
}));

const ComplementaryDialog = ({
  open,
  onClose,
  upSellItems,
}) => {
  const {
    state: {
      items: { localItems },
    },
    actions: { addItem, editItem },
    formatPrice,
  } = useContext(AppContext);
  const styles = useStyles();
  const { t } = useTranslation();
  const [itemsTotal, setItemsTotal] = useState(0);
  const [addedItems, setAddedItems] = useState(null);
  const [isLoading, setIsLoading] = useState([]);
  const theme = useTheme();
  const fullScreen = useMediaQuery(
    theme.breakpoints.down('lg')
  );

  const handleIsLoading = loading =>
    setIsLoading(prevstate => [...prevstate, loading]);

  const productSum = loadedItems => {
    const numOfItems = Object.keys(upSellItems).reduce(
      (sum, category) =>
        (sum += upSellItems[category].length),
      0
    );
    return numOfItems !== loadedItems;
  };

  const handleAddItemsToOrder = addItemToState => {
    setAddedItems(prevstate => addItemToState(prevstate));
  };

  const saveItemsToOrder = () => {
    Object.values(addedItems).forEach(item => {
      if (item.quantity > 0) {
        saveToOrder(item);
      }
    });
    onClose();
  };

  useEffect(() => {
    if (addedItems) {
      const total = Object.values(addedItems).reduce(
        (sum, item) =>
          item.quantity > 0
            ? sum + item.quantity * item.totalPrice
            : sum + 0,
        0
      );
      setItemsTotal(total);
    }
  }, [addedItems]);

  const saveToOrder = product => {
    const existingItem = getExistingItem(
      localItems,
      product
    );
    if (existingItem) {
      const updatedProduct = {
        ...existingItem,
        quantity: existingItem.quantity + product.quantity,
      };
      editItem(updatedProduct);
    } else {
      addItem(product);
    }
  };

  return (
    <Box className={styles.container}>
      <Dialog
        open={open}
        fullScreen={fullScreen}
        classes={{ paper: styles.dialogPaper }}
      >
        {productSum(isLoading.length) && (
          <Box className={styles.loading}>
            <Box>
              <Box display="flex" justifyContent="center">
                <CircularProgress />
              </Box>
              <Typography color="primary">
                {t('title_loading')}
              </Typography>
            </Box>
          </Box>
        )}
        <Box className={styles.backBtn}>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent className={styles.dialogContent}>
          <Typography
            variant="body1"
            className={styles.title}
          >
            {t('crossSellTitle')}
          </Typography>
          <List className={styles.list}>
            {Object.keys(upSellItems).map((category, i) => (
              <div key={i}>
                {upSellItems[category].map(item => {
                  return (
                    <CrossSellItem
                      key={item.description}
                      item={item}
                      formatPrice={formatPrice}
                      handleAddItemsToOrder={
                        handleAddItemsToOrder
                      }
                      handleIsLoading={handleIsLoading}
                    />
                  );
                })}
              </div>
            ))}
          </List>
        </DialogContent>
        <DialogActions className={styles.root}>
          {itemsTotal > 0 ? (
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => {
                saveItemsToOrder();
              }}
            >
              {`${t('Add')} - ${formatPrice(itemsTotal)}`}
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              height="40px"
              onClick={onClose}
            >
              {t('NoThanks')}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

ComplementaryDialog.propTypes = {
  name: string,
  description: string,
  diet: string,
  price: number,
  open: bool,
  onClose: func.isRequired,
  upSellItems: object,
};

ComplementaryDialog.defaultProps = {
  name: '',
  description: '',
  diet: '',
  price: 0,
  open: false,
  upSellItems: {},
};

export default ComplementaryDialog;
