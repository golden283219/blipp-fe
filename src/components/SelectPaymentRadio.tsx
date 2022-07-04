import React from 'react';
import {
  Box,
  Typography,
  FormControlLabel,
  Radio,
  Grid,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useTranslation } from 'react-i18next';
import {
  PaymentTypes,
  PaymentSettings,
} from '../types/paymentTypes';

const useStyles = makeStyles(theme => ({
  labelRoot: {
    marginRight: 0,
  },
  label: {
    width: '100%',
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginLeft: theme.spacing(1),
  },
}));

interface SelectPaymentRadioProps {
  paymentType: PaymentTypes;
  logos: any[];
  paymentSettings: PaymentSettings;
  onChangePhoneNumber: (phoneNumber: string) => void;
  phoneNumberError: {
    errMsg: string;
    isValid: boolean;
    phoneNumber: string;
  };
}

const SelectPaymentRadio: React.FC<SelectPaymentRadioProps> = ({
  paymentType,
  logos,
  paymentSettings,
  onChangePhoneNumber,
  phoneNumberError,
}) => {
  const { t } = useTranslation();
  const styles = useStyles();
  const { type, phoneNumber } = paymentSettings;

  return (
    <>
      <FormControlLabel
        classes={{
          root: styles.labelRoot,
          label: styles.label,
        }}
        value={paymentType}
        name={paymentType}
        checked={type === paymentType}
        control={<Radio id={paymentType} color="primary" />}
        label={
          <Grid container justify="space-between">
            <Grid item>
              <Typography variant="body2">
                {t(paymentType)}
              </Typography>
            </Grid>
            <Grid item>
              <Box className={styles.iconContainer}>
                {logos.map(logo => (
                  <img
                    key={logo}
                    src={logo}
                    className={styles.icon}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        }
      />
      {type === PaymentTypes.Swish &&
        paymentType === PaymentTypes.Swish && (
          <TextField
            required
            size="small"
            id="phone-number"
            defaultValue={phoneNumber}
            variant="outlined"
            onChange={e =>
              onChangePhoneNumber(e.target.value)
            }
            error={!!phoneNumberError}
            helperText={
              !!phoneNumberError && t(phoneNumberError)
            }
          />
        )}
    </>
  );
};

export default SelectPaymentRadio;
