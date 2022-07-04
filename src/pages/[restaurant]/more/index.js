import { useQuery } from '@apollo/client';
import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { navigate } from 'gatsby-link';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import AppContext from '~contexts/AppContext';
import {
  GET_RESTAURANT,
  GET_TERMS_URL,
} from '~graphql/queries';
import endPoints from '../../../api/endPoints';
import HeroBanner from '../../../components/HeroBanner';
import MoreItem from '../../../components/MoreItem';
import SEO from '../../../components/seo';

const useStyles = makeStyles(() => ({
  container: {
    marginTop: 8,
  },
}));

const MorePage = () => {
  const styles = useStyles();
  const { t } = useTranslation();

  const {
    actions: { setDeliveryType },
    restaurantId,
  } = useContext(AppContext);

  const {
    data: restaurantData,
    loading: loadingRestaurant,
  } = useQuery(GET_RESTAURANT, {
    variables: {
      restaurantId,
    },
  });

  const {
    data: termsUrl,
    loading: loadingTermsUrl,
  } = useQuery(GET_TERMS_URL, {
    variables: {
      restaurantId,
    },
  });
  if ((loadingRestaurant, loadingTermsUrl)) return null;

  const cards = [
    {
      title: t('ActiveOrders'),
      path: endPoints.ACTIVE_ORDERS,
    },
    {
      title: t('DeliveryType'),
    },
    {
      title: t('Receipts'),
      path: endPoints.RECEIPTS,
    },
    {
      title: t('Language'),
      path: endPoints.SETTINGS,
    },
    {
      title: t('About us'),
      path: endPoints.ABOUT_US,
    },
  ];

  const handleDeliveryType = () => {
    setDeliveryType(null);
  };

  const handleGoToSetting = () =>
    navigate(termsUrl.termsUrls[0].url);

  const coverImg =
    restaurantData?.restaurant?.coverImg ??
    'https://images.unsplash.com/photo-1544738122-52d63216e052?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80';

  return (
    <>
      <HeroBanner imageUrl={coverImg} />
      <Container>
        <SEO title={t('More')} />
        <Grid
          container
          className={styles.container}
          alignItems="center"
          spacing={2}
        >
          {cards.map(card => (
            <Grid key={card.title} item xs={6}>
              <MoreItem
                handleClick={handleDeliveryType}
                path={card.path}
                title={card.title}
              />
            </Grid>
          ))}
          <Grid item xs={6}>
            <MoreItem
              handleClick={handleGoToSetting}
              title={t('PurchaseConditions')}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default MorePage;
