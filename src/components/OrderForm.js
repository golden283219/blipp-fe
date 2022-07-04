import {
  Box,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import React, { useMemo } from 'react';
import DefaultCard from './DefaultCard';
import FormTextField from './FormTextField';
import {
  createCustomerSchema,
  deliverySchema,
  createCustomerDeliverySchema,
  phoneNumberSchema,
} from '../utils/validationSchemas';
import { useTranslation } from 'react-i18next';
import { DeliveryType } from '../types';
import { getOrderFromInitialValues } from '~utils/orderHelper.ts';
import {
  deliveryFormFields,
  createCustomerFormFields,
} from '~utils/orderHelper';

const useStyles = makeStyles(theme => ({
  card: {
    padding: theme.spacing(2),
    borderRadius: theme.borderRadius.main,
  },
}));

export default ({ customerId, deliveryType, formRef }) => {
  const styles = useStyles();
  const { t } = useTranslation();

  const getSchema = () => {
    if (!customerId && deliveryType === 'DELIVERY') {
      return createCustomerDeliverySchema;
    }
    if (deliveryType === 'DELIVERY') {
      return deliverySchema;
    }
    if (!customerId) return createCustomerSchema;

    return phoneNumberSchema;
  };

  const {
    initialValues,
    validationSchema,
  } = useMemo(() => {
    const initialValues = getOrderFromInitialValues(
      customerId,
      deliveryType
    );
    const validationSchema = getSchema();
    return { initialValues, validationSchema };
  }, [customerId, deliveryType]);

  return (
    <Grid container>
      <DefaultCard className={styles.card}>
        <Box mb={2}>
          <Typography>{t('orderFormTitle')}</Typography>
        </Box>
        <Formik
          innerRef={formRef}
          validateOnMount
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {formik => (
            <Form>
              <Grid container spacing={2}>
                {!customerId && (
                  <>
                    <Grid item xs={12}>
                      <FormTextField
                        placeholder={'Sven'}
                        label={t('firstName')}
                        name={
                          createCustomerFormFields.firstName
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormTextField
                        placeholder={'Svensson'}
                        label={t('lastName')}
                        name={
                          createCustomerFormFields.lastName
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormTextField
                        placeholder={
                          'sven.svensson@example.com'
                        }
                        label={t('email')}
                        name={
                          createCustomerFormFields.email
                        }
                      />
                    </Grid>
                  </>
                )}
                {deliveryType === DeliveryType.DELIVERY && (
                  <>
                    <Grid item xs={12}>
                      <FormTextField
                        placeholder={t(
                          'placeholderAddress'
                        )}
                        label={t('Address')}
                        name={deliveryFormFields.address}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormTextField
                        placeholder={t(
                          'placeholderPostCode'
                        )}
                        label={t('Postcode')}
                        name={deliveryFormFields.zipCode}
                      />
                    </Grid>
                  </>
                )}
                <Grid item xs={12}>
                  <FormTextField
                    placeholder={t(
                      'placeholderPhoneNumber'
                    )}
                    label={t('PhoneNumber')}
                    name={deliveryFormFields.phoneNumber}
                  />
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </DefaultCard>
    </Grid>
  );
};
