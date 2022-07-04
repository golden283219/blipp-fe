import React, { ChangeEvent } from 'react';
import {
  Box,
  Typography,
  CardContent,
  FormControl,
  RadioGroup,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import DefaultCard from './DefaultCard';
import SelectPaymentRadio from './SelectPaymentRadio';
import VisaIcon from '../images/Visa.png';
import MasterCardIcon from '../images/master-card.png';
import SwishIcon from '../images/swish.png';
import {
  PaymentTypes,
  PaymentSettings,
} from '../types/paymentTypes';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  cardContainer: { marginTop: theme.spacing(1) },
  title: { fontWeight: 'bold' },
}));

interface SelectPaymentProps {
  onChangeRadio: (
    taget: ChangeEvent<HTMLInputElement>
  ) => void;
  onChangePhoneNumber: (phoneNumber: string) => void;
  paymentSettings: PaymentSettings;
  phoneNumberError: {
    errMsg: string;
    isValid: boolean;
    phoneNumber: string;
  };
}

const SelectPayment: React.FC<SelectPaymentProps> = ({
  onChangeRadio,
  onChangePhoneNumber,
  paymentSettings,
  phoneNumberError,
}) => {
  const { t } = useTranslation();
  const styles = useStyles();

  return (
    <DefaultCard className={styles.cardContainer}>
      <CardContent>
        <Typography className={styles.title}>
          {t('paymentOptions')}
        </Typography>
        <FormControl
          component="fieldset"
          classes={{
            root: styles.root,
          }}
        >
          <RadioGroup
            name="Payment"
            aria-label="Payment"
            onChange={onChangeRadio}
          >
            <SelectPaymentRadio
              paymentType={PaymentTypes.Swish}
              logos={[SwishIcon]}
              paymentSettings={paymentSettings}
              onChangePhoneNumber={onChangePhoneNumber}
              phoneNumberError={phoneNumberError}
            />
            <SelectPaymentRadio
              paymentType={PaymentTypes.CreditCard}
              logos={[VisaIcon, MasterCardIcon]}
              paymentSettings={paymentSettings}
              onChangePhoneNumber={onChangePhoneNumber}
            />
          </RadioGroup>
        </FormControl>
      </CardContent>
    </DefaultCard>
  );
};
export default SelectPayment;
