import {
  Box,
  CardContent,
  Divider,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ReceiptType } from '~types';
import { createCurrencyFormat } from '~utils/restaurantUtils';
import { PaymentTypes } from '../types/paymentTypes';
import {
  calcVatAmount,
  timeConverter,
} from '../utils/formatHelper';
import DefaultCard from './DefaultCard';
import ReceiptOrderItem from './ReceiptOrderItem';

const useStyles = makeStyles(() => ({
  container: {
    maxWidth: '500px',
    margin: 'auto',
  },
  card: {
    marginTop: 16,
    height: '100%',
    fontSize: 14,
  },
  dashed: {
    borderTop: '0.8px dashed #424242',
  },
  title: {
    textAlign: 'center',
    '& h2': {
      margin: 16,
    },
    '& p': {
      fontSize: 'medium',
    },
  },
  paragraph: {
    margin: '8px 0px',
  },
  paragraphBold: {
    margin: '8px 0px',
    fontWeight: 'bold',
  },
  spacing: {
    '& p': {
      margin: 0,
    },
    margin: '8px 0px',
  },
  total: {
    fontWeight: 'bold',
    '& p': {
      margin: 0,
    },
    margin: '8px 0px',
  },
  sectionContainer: {
    paddingBottom: 4,
  },
}));

interface ReceiptDetailsProps {
  receipt: ReceiptType;
}

const ReceiptDetails: React.FC<ReceiptDetailsProps> = ({
  receipt,
}) => {
  const styles = useStyles();
  const { t } = useTranslation();

  const {
    restaurantName,
    address,
    orgnr,
    receiptCurrency,
    items,
    date,
    receiptVat,
    restaurantPhoneNumber,
    ka,
    total,
    rounding,
    paymentMethod,
    sn,
    cardType,
    cardNumber,
    isReturnReceipt,
    deliveryCostInfo,
  } = receipt;

  const deliveryInfo =
    deliveryCostInfo && JSON.parse(deliveryCostInfo);

  const formattedDate = timeConverter(date);

  const totalVat = receiptVat.reduce(
    (sum, vat) => sum + calcVatAmount(vat.gross, vat.vat),
    0
  );
  const formatPrice = createCurrencyFormat(receiptCurrency);

  return (
    <Box className={styles.container}>
      <DefaultCard className={styles.card}>
        <CardContent>
          <Box>
            <Box
              width="100%"
              textAlign="center"
              className={styles.title}
            >
              <h2>{restaurantName}</h2>
              <p className={styles.paragraph}>{address}</p>
              <p className={styles.paragraph}>
                {t('ReceiptTel', {
                  phoneNumber: restaurantPhoneNumber,
                })}
              </p>
              <p className={styles.paragraph}>
                {t('Orgnr', {
                  orgnr,
                })}
              </p>
            </Box>
            <p className={styles.paragraph}>{`${t(
              'Date'
            )}: ${formattedDate}`}</p>
            <p
              className={styles.paragraph}
            >{`KA: ${ka}`}</p>
            {isReturnReceipt && (
              <Box width="100%" textAlign="center">
                <p className={styles.paragraphBold}>
                  Retur
                </p>
                <p className={styles.paragraphBold}>
                  Godkänd
                </p>
              </Box>
            )}
            <Divider className={styles.dashed} />
            {items.map(item => (
              <ReceiptOrderItem
                key={item.name}
                item={item}
                formatPrice={formatPrice}
              />
            ))}
            <Divider className={styles.dashed} />

            <Box className={styles.sectionContainer}>
              {deliveryInfo && (
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  className={styles.spacing}
                >
                  <p>{t('DeliveryCost')}</p>
                  <p>{formatPrice(deliveryInfo.gross)}</p>
                </Box>
              )}
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                className={styles.spacing}
              >
                <p>{t('Rounding')}</p>
                <p>{formatPrice(rounding)}</p>
              </Box>

              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                className={styles.total}
              >
                <p>{t('Total')}</p>
                <p>{formatPrice(Math.round(total))}</p>
              </Box>
            </Box>

            <Box className={styles.sectionContainer}>
              <p className={styles.spacing}>{t('Vat')}</p>
              {receiptVat &&
                receiptVat.map(vatItem => {
                  const vatAmount = calcVatAmount(
                    vatItem.gross,
                    vatItem.vat
                  );

                  return (
                    <Box
                      display="flex"
                      flexDirection="row"
                      justifyContent="space-between"
                      className={styles.spacing}
                      key={vatItem.vat}
                    >
                      <p
                        className={styles.spacing}
                      >{`${vatItem.vat}%`}</p>

                      <p>{formatPrice(vatAmount)}</p>
                    </Box>
                  );
                })}

              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                className={styles.spacing}
              >
                <p className={styles.spacing}>
                  {t('TotalVat')}
                </p>

                <p>{formatPrice(totalVat)}</p>
              </Box>
            </Box>

            {paymentMethod === PaymentTypes.Swish && (
              <p className={styles.spacing}>
                {t('PaidWith', { paymentMethod })}
              </p>
            )}

            {paymentMethod === PaymentTypes.CreditCard &&
              cardType &&
              cardNumber && (
                <>
                  <p className={styles.spacing}>
                    {cardType}
                  </p>
                  <p className={styles.spacing}>
                    {cardNumber}
                  </p>
                </>
              )}

            <p className={styles.spacing}>{`SN#${sn}`}</p>
          </Box>
        </CardContent>
      </DefaultCard>
    </Box>
  );
};
export default ReceiptDetails;
