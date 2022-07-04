import { useQuery } from '@apollo/client';
import React, { useContext } from 'react';
import { GET_RESTAURANT } from '~graphql/queries';
import LoadingView from '../../components/LoadingView';
import AppContext from '../../contexts/AppContext';
import isBrowser from '../../utils/isBrowser';
import { redirectMessenger } from '../../utils/routeHelper';

const Redirect = () => {
  const { restaurantId } = useContext(AppContext);

  useQuery(GET_RESTAURANT, {
    variables: {
      restaurantId,
    },
    onCompleted: data =>
      isBrowser() &&
      redirectMessenger(data?.restaurant?.messengerUrl),
  });

  return <LoadingView />;
};

export default Redirect;
