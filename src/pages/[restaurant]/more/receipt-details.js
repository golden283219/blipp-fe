import { useQuery } from '@apollo/client';
import { Container } from '@material-ui/core';
import { shape, string } from 'prop-types';
import React, { useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import AppContext from '~contexts/AppContext';
import ReceiptDetails from '../../../components/ReceiptDetails';
import SEO from '../../../components/seo';
import { GET_RECEIPTS } from '../../../graphql/queries';

const ReceiptDetailsPage = ({ location }) => {
  const { t } = useTranslation();
  const { restaurantId, customerId } = useContext(
    AppContext
  );

  const { data } = useQuery(GET_RECEIPTS, {
    variables: {
      restaurantId,
      customerId,
    },
  });
  const receipt = useMemo(() => {
    if (!location) return;
    const query = location.search.replace('?rId=', '');
    const receipts = data?.receipts ?? [];
    return receipts.find(rec => rec.id === Number(query));
  }, [location, data]);

  return (
    <Container>
      <SEO title={t('Receipt')} />
      {receipt && <ReceiptDetails receipt={receipt} />}
    </Container>
  );
};

ReceiptDetailsPage.propTypes = {
  location: shape({
    search: string,
  }),
};

ReceiptDetailsPage.defaultProps = {
  location: { search: '' },
};

export default ReceiptDetailsPage;
