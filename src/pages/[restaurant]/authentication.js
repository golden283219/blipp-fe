import { useMutation } from '@apollo/client';
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { navigate } from 'gatsby';
import React, { useContext, useEffect } from 'react';
import AppContext from '~contexts/AppContext';
import { GET_PAYMENT_STATUS } from '~graphql/mutations';
import getSearchParams from '~utils/getSearchParam';
import { PAYMENT_INFO_KEY } from '~utils/localstorageHelper';
import { Routes } from '../../types/routes';
import { dynamicNavigate } from '../../utils/routeHelper';

const useStyles = makeStyles(theme => ({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const authentication = () => {
  const {
    actions: { resetItems },
  } = useContext(AppContext);
  const styles = useStyles();
  const orderId = getSearchParams('orderId');
  const paymentType = getSearchParams('paymentType');

  const [
    getPaymentStatus,
    { data: paymentStatus },
  ] = useMutation(GET_PAYMENT_STATUS, {
    onError: error => navigate('/food'),
  });

  const handlePaymentComplete = () => {
    resetItems();
    dynamicNavigate(
      `${Routes.ORDERSTATUS}?orderId=${orderId}`
    );
  };

  const handlePaymentFailure = () => {
    dynamicNavigate(`${Routes.ORDER}?payment_message=fail`);
  };

  useEffect(() => {
    if (orderId && paymentType) {
      getPaymentStatus({
        variables: {
          orderId: Number(orderId),
          paymentType,
        },
      });
    }
  }, [orderId, paymentType]);

  useEffect(() => {
    localStorage.removeItem(PAYMENT_INFO_KEY);
    if (
      paymentStatus &&
      paymentStatus.patchOrderGetPaymentStatus
    ) {
      const {
        patchOrderGetPaymentStatus: { paymentConfirmation },
      } = paymentStatus;

      if (paymentConfirmation === 'Completed') {
        handlePaymentComplete();
      } else {
        handlePaymentFailure();
      }
    }
  }, [paymentStatus]);
  return (
    <div className={styles.container}>
      <CircularProgress color="primary" />
    </div>
  );
};

export default authentication;
