import { useQuery } from '@apollo/client';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import AppContext from '~contexts/AppContext';
import getSearchParams from '~utils/getSearchParam';
import EmptyView from '../../../components/EmptyView';
import LoadingView from '../../../components/LoadingView';
import OrderStatusRow from '../../../components/OrderStatusRow';
import { GET_ORDER_STATUS } from '../../../graphql/queries';
import { OrderStatusTypes } from '../../../types/orderTypes';
import { Routes } from '../../../types/routes';
import { timeConverter } from '../../../utils/formatHelper';
import { dynamicNavigate } from '../../../utils/routeHelper';
import { getAppStateId } from '../../../utils/webIdUtils';

const useStyles = makeStyles({
  container: {
    width: '100%',
    height: '90vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginBottom: 16,
  },
  line: {
    width: '1px',
    height: '48px',
    opacity: 0.3,
    margin: '8px 0px 8px 9px',
    backgroundColor: '#000000',
  },
});

const OrderStatus = ({ location }) => {
  const styles = useStyles();
  const { t } = useTranslation();
  const [order, setOrder] = useState(null);
  const { restaurantId, customerId } = useContext(
    AppContext
  );
  const [preparing, setPreparing] = useState(false);
  const [done, setDone] = useState(false);

  const id = getAppStateId(customerId);

  const { data, loading, error } = useQuery(
    GET_ORDER_STATUS,
    {
      variables: {
        restaurantId,
        customerId: id,
      },
      pollInterval: 120000,
    }
  );

  const handleStatusUpdate = order => {
    if (
      order.foodStatus === OrderStatusTypes.PREPARING &&
      !preparing
    ) {
      setPreparing(true);
    }

    if (order.foodStatus === OrderStatusTypes.DONE) {
      setPreparing(true);
      setDone(true);
    }
  };

  useEffect(() => {
    if (location && data) {
      const id = getSearchParams('orderId');
      const order = data.ordersStatus.find(
        order => order.id === Number(id)
      );
      setOrder(order);
      handleStatusUpdate(order);
    }
  }, [data]);

  const handleEmptyView = () =>
    dynamicNavigate(Routes.FOOD);

  if (loading) return <LoadingView />;

  if (!order && error)
    return (
      <EmptyView
        onClick={handleEmptyView}
        title={t('SomethingWentWrong')}
        buttonTitle={t('GoBackToMenu')}
      />
    );

  return (
    <Box className={styles.container}>
      <Box>
        <Box className={styles.title}>
          <Typography>{t('ActiveOrderTitle')}</Typography>
          <Typography variant="caption">
            {timeConverter(order?.createdAt)}
          </Typography>
        </Box>
        <OrderStatusRow
          title={t('OrderStatusOrdered')}
          isComplete={true}
        />
        <Box className={styles.line} />
        <OrderStatusRow
          title={t('OrderStatusPrepared')}
          isComplete={preparing}
        />
        <Box className={styles.line} />
        <OrderStatusRow
          title={t('OrderStatusDone')}
          isComplete={done}
        />
      </Box>
    </Box>
  );
};

export default OrderStatus;
