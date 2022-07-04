import { useQuery } from '@apollo/client';
import { Box, Typography } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AppContext from '~contexts/AppContext';
import ListContainer from '../../../components/ListContainer';
import ListRow from '../../../components/ListRow';
import NoContentView from '../../../components/NoContentView';
import { GET_ORDER_STATUS } from '../../../graphql/queries';
import { Routes } from '../../../types/routes';
import {
  sortByDate,
  timeConverter,
} from '../../../utils/formatHelper';
import { dynamicNavigate } from '../../../utils/routeHelper';
import { getAppStateId } from '../../../utils/webIdUtils';

const ActiveOrders = () => {
  const { t } = useTranslation();
  const { restaurantId, customerId } = useContext(
    AppContext
  );
  const id = getAppStateId(customerId);

  const [sortedOrders, setSortedOrders] = useState(null);

  const { loading, error } = useQuery(GET_ORDER_STATUS, {
    variables: {
      restaurantId,
      customerId: id,
    },
    onCompleted: data => {
      const orders =
        data?.ordersStatus.length === 0
          ? null
          : sortByDate(data?.ordersStatus, 'createdAt');
      setSortedOrders(orders);
    },
  });

  if (loading) return null;

  if (error || !sortedOrders)
    return <NoContentView title={t('NoActiveOrders')} />;
  return (
    <ListContainer>
      {sortedOrders && (
        <>
          {sortedOrders.map(({ createdAt, id }) => (
            <Box
              key={createdAt}
              onClick={() =>
                dynamicNavigate(
                  `${Routes.ORDERSTATUS}?orderId=${id}`
                )
              }
            >
              <ListRow date={createdAt}>
                <Typography variant="body2">
                  {timeConverter(createdAt)}
                </Typography>
              </ListRow>
            </Box>
          ))}
        </>
      )}
    </ListContainer>
  );
};

export default ActiveOrders;
