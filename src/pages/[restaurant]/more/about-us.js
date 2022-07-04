import { useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { GET_RESTAURANT } from '~graphql/queries';
import LoadingIndicator from '../../../components/LoadingIndicator';
import SEO from '../../../components/seo';
import AppContext from '../../../contexts/AppContext';

const useStyles = makeStyles(theme => ({
  textContainer: { padding: theme.spacing(2) },
  text: {
    fontSize: '20px',
  },
}));

const AboutUs = () => {
  const { t } = useTranslation();
  const styles = useStyles();
  const { restaurantId } = useContext(AppContext);

  const { data, loading } = useQuery(GET_RESTAURANT, {
    variables: {
      restaurantId,
    },
  });

  if (loading) return <LoadingIndicator />;

  return (
    <>
      <SEO title={t('Blipp')} />
      <div className={styles.textContainer}>
        <h2>{t('About us')}</h2>
        <p className={styles.text}>
          {data?.restaurant?.about ?? ''}
        </p>
      </div>
    </>
  );
};

export default AboutUs;
