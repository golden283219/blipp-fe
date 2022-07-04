import {
  useLazyQuery,
  useMutation,
  useQuery,
} from '@apollo/client';
import {
  Box,
  CardContent,
  Container,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { array } from 'prop-types';
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import DefaultCard from '~components/DefaultCard';
import NoOrdersView from '~components/NoOrdersView';
import {
  GET_RESTAURANT,
  GET_TOKEN,
} from '~graphql/queries';
import { DeliveryType, localstorageKeys } from '~types';
import {
  timeStringToISO,
  timeStringToMinutes,
  toTimeFormat,
} from '~utils/formatHelper';
import getSearchParams from '~utils/getSearchParam';
import {
  getLocalStorageValue,
  PAYMENT_INFO_KEY,
  setLocalStorageValue,
} from '~utils/localstorageHelper';
import {
  deliveryFormFields,
  getFormValues,
  getpreparationTime,
} from '~utils/orderHelper';
import { validatePhoneNumber } from '~utils/paymentUtils';
import ActionDialog from '../../components/ActionDialog';
import OrderDescription from '../../components/OrderDescription';
import OrderForm from '../../components/OrderForm';
import OrderTimeButton from '../../components/OrderTimeButton';
import PaymentButton from '../../components/PaymentButton';
import PaymentSnackbar from '../../components/PaymentSnackbar';
import SelectPayment from '../../components/SelectPayment';
import SEO from '../../components/seo';
import AppContext from '../../contexts/AppContext';
import {
  ADD_ITEMS_TO_ORDER,
  ADD_ORDER,
  CREATE_CUSTOMER,
  GET_PAYMENT,
} from '../../graphql/mutations';
import { PaymentTypes } from '../../types/paymentTypes';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.margins.marginToHeader,
    marginBottom: theme.margins.bottomNavHeight + 24,
  },
  paymentButtonContainer: {
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: theme.margins.bottomNavHeight,
    zIndex: theme.zIndex.appBar,
    backgroundColor: '#fff',
  },
  cardContainer: {
    width: '70vw',
  },
  cardContainer2: {
    display: 'none',
  },
  listItem: {
    width: '100%',
    height: '100%',
    paddingLeft: 0,
    paddingRight: 0,
  },
  deliveryContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  card: {
    minHeight: 0,
  },
}));

const OrderPage = () => {
  const restaurantTableIds = [1, 2, 3, 4, 5, 6, 7, 8];
  const styles = useStyles();
  const { t } = useTranslation();
  const paymentMessage = getSearchParams('payment_message');
  const showReturnModule = getSearchParams(
    'payment_return'
  );

  const formRef = useRef();
  const tableField = useRef();

  const {
    state: {
      items: { localItems },
      deliveryType,
    },
    actions: { deleteItem, editItem },
    restaurantId,
    customerId,
    formatPrice,
    isRestaurantOpen,
    tableId: tableIdContext,
  } = useContext(AppContext);

  const { data: restaurantData } = useQuery(
    GET_RESTAURANT,
    {
      variables: {
        restaurantId,
      },
      onCompleted: restaurantData => {
        if (!restaurantData) return;
        const { deliveryCost } = restaurantData.restaurant;
        if (
          deliveryType === DeliveryType.DELIVERY &&
          deliveryCost
        ) {
          setDeliveryPrice(deliveryCost.cost);
        }

        setInitialPreparationTime();

        const prepTime = getpreparationTime(
          restaurantData.restaurant,
          deliveryType
        );

        setExtraData(prevState => ({
          ...prevState,
          orderTime: toTimeFormat(prepTime),
        }));
      },
    }
  );

  const [addOrder] = useMutation(ADD_ORDER, {
    onCompleted: data => setOrderId(data.postOrders.id),
    onError: error => {
      setErrorMsg(
        error.graphQLErrors[0].extensions.responseBody.error
          .message
      );
      setShowErrorDialog(true);
    },
  });

  const [getToken, { data: tokenData }] = useLazyQuery(
    GET_TOKEN
  );

  const [createCustomer] = useMutation(CREATE_CUSTOMER, {
    onCompleted: data => {
      setLocalStorageValue(localstorageKeys.webId, {
        id: data.postCustomers.id,
        [localstorageKeys.timeStamp]: Date.now(),
      });
      getToken({
        variables: { id: data.postCustomers.id },
      });
    },
    onError: error => {
      setErrorMsg(
        error.graphQLErrors[0].extensions.responseBody.error
          .message
      );
      setShowErrorDialog(true);
    },
  });

  useEffect(() => {
    const token = tokenData?.getToken?.token;
    if (token) {
      const { id } = getLocalStorageValue(
        localstorageKeys.webId
      );
      setLocalStorageValue(localstorageKeys.token, {
        token,
        [localstorageKeys.timeStamp]: Date.now(),
      });
      handleAddOrder(id);
    }
  }, [tokenData]);

  const [
    addItemsToOrder,
    { loading: addItemsLoading },
  ] = useMutation(ADD_ITEMS_TO_ORDER, {
    onCompleted: data => onAddItemsToOrderCompleted(),
  });

  const [
    getPayment,
    { data: paymentOperations },
  ] = useMutation(GET_PAYMENT);

  const [deliveryPrice, setDeliveryPrice] = useState(null);

  const [showDeleteDialog, setShowDeleteDialog] = useState(
    false
  );

  const [
    openPaymentMessage,
    setOpenPaymentMessage,
  ] = useState(false);
  const [tableId, setTableId] = useState(tableIdContext);
  const [orderId, setOrderId] = useState(null);
  const [tableIdError, setTableIdError] = useState(null);
  const [
    phoneNumberError,
    setPhoneNumberError,
  ] = useState();
  const [
    showOrderCompleteDialog,
    setShowOrderCompleteDialog,
  ] = useState(false);
  const [extraData, setExtraData] = useState({
    [deliveryFormFields.address]: '',
    [deliveryFormFields.phoneNumber]: '',
    [deliveryFormFields.zipCode]: '',
    orderTime: '',
  });

  const [paymentSettings, setPaymentSettings] = useState({
    type: PaymentTypes.Swish,
    phoneNumber: '+46',
  });

  const [itemId, setItemId] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const [showErrorDialog, setShowErrorDialog] = useState(
    false
  );
  const [preparationTime, setPreparationTime] = useState(0);

  useEffect(() => {
    let interval;
    if (showOrderCompleteDialog) {
      const savedPaymentInfo = getLocalStorageValue(
        PAYMENT_INFO_KEY
      );
      const { paymentSettings } = savedPaymentInfo;

      interval = setInterval(() => {
        if (
          paymentSettings.type === PaymentTypes.CreditCard
        ) {
          payex.hostedView
            .creditCard({
              container: 'swedbank-pay-seamless-view-page2',
            })
            .open();
        } else {
          payex.hostedView
            .swish({
              container: 'swedbank-pay-seamless-view-page2',
            })
            .open();
        }
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [showOrderCompleteDialog]);

  useEffect(() => {
    if (showReturnModule) {
      const savedPaymentInfo = getLocalStorageValue(
        PAYMENT_INFO_KEY
      );
      const {
        paymentSettings,
        scriptSrc,
      } = savedPaymentInfo;
      setPaymentSettings(paymentSettings);
      const script = openModal(
        scriptSrc,
        paymentSettings.type
      );
      return () => document.body.removeChild(script);
    }
  }, [showReturnModule]);

  useEffect(() => {
    if (paymentOperations) {
      const index =
        paymentSettings.type === PaymentTypes.CreditCard
          ? 1
          : 3;
      const scriptSrc =
        paymentOperations.patchOrdersGetPayment[index].href;

      setLocalStorageValue(PAYMENT_INFO_KEY, {
        paymentSettings,
        scriptSrc,
      });

      const script = openModal(
        scriptSrc,
        paymentSettings.type
      );
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [paymentOperations]);

  useEffect(() => {
    setOrderId(null);
  }, [paymentSettings.type]);

  const openModal = (scriptSrc, type) => {
    const script = document.createElement('script');
    script.src = scriptSrc;
    script.async = true;
    document.body.appendChild(script);

    setShowOrderCompleteDialog(true);

    setTimeout(() => {
      if (type === PaymentTypes.CreditCard) {
        payex.hostedView
          .creditCard({
            container: 'swedbank-pay-seamless-view-page',
          })
          .open();
      } else {
        payex.hostedView
          .swish({
            container: 'swedbank-pay-seamless-view-page',
          })
          .open();
      }
    }, 1000);
    return script;
  };

  useEffect(() => {
    if (paymentMessage && paymentMessage === 'fail') {
      setOpenPaymentMessage(true);
    }
  }, [paymentMessage]);

  useEffect(() => {
    if (orderId) {
      onAddOrderCompleted(orderId);
    }
  }, [orderId]);

  const handlePaymentType = ({ target }) => {
    setPaymentSettings(prevstate => ({
      ...prevstate,
      type: target.value,
    }));
  };

  const handlePhoneNumber = value => {
    setPaymentSettings(prevstate => ({
      ...prevstate,
      phoneNumber: value,
    }));
  };

  const setInitialPreparationTime = () => {
    const prepTime = getpreparationTime(
      restaurantData.restaurant,
      deliveryType
    );
    setPreparationTime(prepTime);
  };

  const handleQuantityChange = (e, quantity, product) => {
    e.preventDefault();
    if (quantity < 1) {
      setItemId(product.localId);
      toggleDeleteDialog();
    } else {
      const updatedProduct = {
        ...product,
        quantity,
      };
      editItem(updatedProduct);
    }
  };

  const handlePaymentMessageClose = (event, reason) => {
    if (reason !== 'clickaway') {
      setOpenPaymentMessage(false);
    }
  };

  const handleTableIdChange = e => {
    setTableId(+e.target.value);
  };

  const handlePrepTimeChange = timeString => {
    setPreparationTime(timeStringToMinutes(timeString));
  };

  const toggleDeleteDialog = () =>
    setShowDeleteDialog(prevState => !prevState);

  const toggleErrorDialog = () =>
    setShowErrorDialog(prevState => !prevState);

  const handleClosePayment = () => {
    setShowOrderCompleteDialog(false);
  };

  const handleAddOrder = (id, deliveryFormValues) => {
    const orderTime = timeStringToISO(
      toTimeFormat(preparationTime) || extraData?.orderTime
    );

    const deliveryInfo = {
      ...(deliveryFormValues ?? extraData),
      orderTime,
    };

    addOrder({
      variables: {
        restaurantId,
        customerId: id ?? customerId,
        tableId:
          tableId &&
          deliveryType === DeliveryType.RESERVATION
            ? tableId
            : undefined,
        deliveryType,
        paymentMethod: paymentSettings.type,
        ...deliveryInfo,
      },
    });
  };
  const onSubmitOrder = () => {
    // if (deliveryType === DeliveryType.RESERVATION) {
    //   if (!tableId) {
    //     window.scrollTo({
    //       behavior: 'smooth',
    //       top: tableField.current.offsetTop,
    //     });
    //   }
    //   const { errMsg, isValid } = validateTableId(
    //     tableId,
    //     restaurantTableIds
    //   );
    //   if (!isValid) {
    //     setTableIdError(errMsg);
    //     return;
    //   } else {
    //     setTableIdError(null);
    //   }
    // }

    if (paymentSettings.type === PaymentTypes.Swish) {
      const {
        errMsg,
        isValid,
        phoneNumber,
      } = validatePhoneNumber(paymentSettings.phoneNumber);
      if (!isValid) {
        setPhoneNumberError(errMsg);
        return;
      } else {
        handlePhoneNumber(phoneNumber);
        setPhoneNumberError(null);
      }
    }

    if (orderId) {
      onAddOrderCompleted(orderId);
      return;
    }

    const formValues = getFormValues(formRef?.current);

    if (!customerId) {
      setExtraData(formValues?.deliveryFields);
      createCustomer({
        variables: formValues?.createCustomerFields,
      });
      return;
    }

    handleAddOrder(null, formValues?.deliveryFields);
  };

  const onAddOrderCompleted = orderId => {
    const items = localItems.map(item => {
      const {
        quantity,
        itemId,
        specialRequest,
        variants,
        allergies,
        productGroupId,
      } = item;
      const getVariantIds = variant =>
        Array.isArray(variant)
          ? variant
              .map(option => option.checked && option.id)
              .filter(isNumber => isNumber)
          : [Number(variant)];

      const allergyIds = getVariantIds(allergies);
      const variantOptionsIds = Object.values(
        variants
      ).reduce(
        (result, variant) => [
          ...result,
          ...getVariantIds(variant.options),
        ],
        []
      );

      return {
        quantity,
        itemId,
        specialRequest,
        variantOptionsIds,
        allergyIds,
        productGroupId,
      };
    });
    addItemsToOrder({ variables: { orderId, items } });
  };

  const onAddItemsToOrderCompleted = () => {
    getPayment({
      variables: {
        orderId,
        paymentType: paymentSettings.type,
        phoneNumber:
          paymentSettings.type === PaymentTypes.Swish
            ? paymentSettings.phoneNumber
            : undefined,
      },
    });
  };

  const orderTotal = () => {
    let total = localItems.reduce(
      (total, item) =>
        total + item.totalPrice * item.quantity,
      0
    );
    if (deliveryPrice) {
      total += deliveryPrice;
    }
    return formatPrice(Math.round(total));
  };

  return (
    <Container className={styles.container}>
      <SEO title={t('Order')} />
      {localItems && localItems.length > 0 ? (
        <>
          <Box marginY={2}>
            <OrderDescription
              order={localItems}
              formatPrice={formatPrice}
              handleQuantityChange={handleQuantityChange}
            />
          </Box>
          {deliveryType === DeliveryType.DELIVERY && (
            <Box className={styles.listItem}>
              <DefaultCard className={styles.card}>
                <CardContent>
                  <Box className={styles.deliveryContent}>
                    <Typography>
                      <b> {t('DeliveryCost')}</b>
                    </Typography>
                    <Typography
                      color="primary"
                      align="right"
                      variant="body1"
                    >
                      <b>{formatPrice(deliveryPrice)}</b>
                    </Typography>
                  </Box>
                </CardContent>
              </DefaultCard>
            </Box>
          )}

          {deliveryType !== 'RESERVATION' && (
            <OrderTimeButton
              preparationTime={preparationTime}
              deliveryType={deliveryType}
              onPrepTimeChange={handlePrepTimeChange}
            />
          )}
          {/* {deliveryType === 'RESERVATION' && (
            <TextField
              label={t('TableNumber')}
              ref={tableField}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              fullWidth
              onChange={e => handleTableIdChange(e)}
              error={!!tableIdError}
              helperText={
                !!tableIdError && t(`${tableIdError}`)
              }
            />
          )} */}
          <OrderForm
            customerId={!!customerId}
            deliveryType={deliveryType}
            formRef={formRef}
          />
          <SelectPayment
            onChangeRadio={handlePaymentType}
            onChangePhoneNumber={handlePhoneNumber}
            paymentSettings={paymentSettings}
            phoneNumberError={phoneNumberError}
          />

          <Box marginY={3}>
            <Box className={styles.paymentButtonContainer}>
              <PaymentButton
                onClick={onSubmitOrder}
                orderTotal={orderTotal()}
                title={`${t('PayWith')} ${t(
                  paymentSettings.type
                )}`}
                loading={addItemsLoading}
                isRestaurantOpen={isRestaurantOpen}
              />
            </Box>
          </Box>
          <ActionDialog
            open={showErrorDialog}
            title={errorMsg}
            secondActionText={t('ok')}
            handleSecondAction={() =>
              toggleErrorDialog(false)
            }
            onBackdropClick={() => toggleErrorDialog(false)}
          />
          <ActionDialog
            open={showDeleteDialog}
            title={t('RemoveProductDesc')}
            firstActionText={t('No')}
            secondActionText={t('Yes')}
            handleFirstAction={toggleDeleteDialog}
            handleSecondAction={() => {
              deleteItem(itemId);
              toggleDeleteDialog();
            }}
            onBackdropClick={toggleDeleteDialog}
          />
          <ActionDialog
            open={showOrderCompleteDialog}
            onBackdropClick={handleClosePayment}
          >
            <div
              className={styles.cardContainer}
              id="swedbank-pay-seamless-view-page"
            />
          </ActionDialog>
          <div
            className={styles.cardContainer2}
            id="swedbank-pay-seamless-view-page2"
          />
        </>
      ) : (
        <NoOrdersView />
      )}
      <PaymentSnackbar
        open={openPaymentMessage}
        message={t('SnackbarPaymentFail')}
        type="error"
        handleClose={handlePaymentMessageClose}
      />
    </Container>
  );
};

OrderPage.propTypes = {
  order: array,
};

OrderPage.defaultProps = {
  order: [],
};

export default OrderPage;
