import { useQuery } from '@apollo/client';
import { Box, Typography } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AppContext from '~contexts/AppContext';
import endPoints from '../../../api/endPoints';
import ListContainer from '../../../components/ListContainer';
import ListRow from '../../../components/ListRow';
import LoadingIndicator from '../../../components/LoadingIndicator';
import NoContentView from '../../../components/NoContentView';
import SEO from '../../../components/seo';
import { GET_RECEIPTS } from '../../../graphql/queries';
import {
  sortByDate,
  timeConverter,
} from '../../../utils/formatHelper';
import { dynamicNavigate } from '../../../utils/routeHelper.ts';

const ReceiptsPage = () => {
  const { t } = useTranslation();
  const { restaurantId, customerId } = useContext(
    AppContext
  );

  const [sortedReceipts, setSortedReceipts] = useState(
    null
  );

  const { loading, error } = useQuery(GET_RECEIPTS, {
    variables: {
      restaurantId,
      customerId,
    },
    onCompleted: data =>
      setSortedReceipts(sortByDate(data?.receipts, 'date')),
  });

  if (loading) return <LoadingIndicator />;

  if (!customerId) {
    return <NoContentView title={t('ReceiptsWebApp')} />;
  }
  if (error) {
    return (
      <NoContentView title={t('SomethingWentWrong')} />
    );
  }

  return (
    <>
      <SEO title={t('Receipts')} />
      <ListContainer>
        {sortedReceipts && (
          <>
            {sortedReceipts.map(receipt => (
              <Box
                key={receipt.sn}
                onClick={() =>
                  dynamicNavigate(
                    `${endPoints.RECEIPT_DETAILS}?rId=${receipt.id}`
                  )
                }
              >
                <ListRow>
                  <Typography variant="body2">
                    {receipt.restaurantName}
                  </Typography>
                  <Typography variant="body2">
                    {timeConverter(receipt.date)}
                  </Typography>
                  <Typography variant="body2">
                    {receipt.isReturnReceipt
                      ? 'Returkvitto'
                      : 'Betalkvitto'}
                  </Typography>
                </ListRow>
              </Box>
            ))}
          </>
        )}
      </ListContainer>
    </>
  );
};

export default ReceiptsPage;
