import i18next from 'i18next';
import { object, string } from 'yup';
import {
  deliveryFormFields,
  createCustomerFormFields,
} from '~utils/orderHelper';

const rePhoneNumber = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

export const phoneNumberSchema = object().shape({
  [deliveryFormFields.phoneNumber]: string()
    .matches(rePhoneNumber, i18next.t('InvalidPhoneNumber'))
    .required(i18next.t('Required')),
});

export const deliverySchema = object().shape({
  [deliveryFormFields.address]: string().required(
    i18next.t('Required')
  ),

  [deliveryFormFields.phoneNumber]: string()
    .matches(rePhoneNumber, i18next.t('InvalidPhoneNumber'))
    .required(i18next.t('Required')),
  [deliveryFormFields.zipCode]: string()
    .matches(/^[0-9]+$/, i18next.t('Must be only digits'))
    .min(5, i18next.t('Must be exactly 5 digits'))
    .max(5, i18next.t('Must be exactly 5 digits'))
    .required(i18next.t('Required')),
});

export const createCustomerSchema = object().shape({
  [createCustomerFormFields.firstName]: string().required(
    i18next.t('Required')
  ),
  [createCustomerFormFields.lastName]: string().required(
    i18next.t('Required')
  ),
  [createCustomerFormFields.email]: string()
    .email()
    .required(i18next.t('Required')),
  [deliveryFormFields.phoneNumber]: string()
    .matches(rePhoneNumber, i18next.t('InvalidPhoneNumber'))
    .required(i18next.t('Required')),
});

export const createCustomerDeliverySchema = object().shape({
  [createCustomerFormFields.firstName]: string().required(
    i18next.t('Required')
  ),
  [createCustomerFormFields.lastName]: string().required(
    i18next.t('Required')
  ),
  [createCustomerFormFields.email]: string()
    .email()
    .required(i18next.t('Required')),
  [deliveryFormFields.address]: string().required(
    i18next.t('Required')
  ),

  [deliveryFormFields.phoneNumber]: string()
    .matches(rePhoneNumber, i18next.t('InvalidPhoneNumber'))
    .required(i18next.t('Required')),
  [deliveryFormFields.zipCode]: string()
    .matches(/^[0-9]+$/, i18next.t('Must be only digits'))
    .min(5, i18next.t('Must be exactly 5 digits'))
    .max(5, i18next.t('Must be exactly 5 digits'))
    .required(i18next.t('Required')),
});

export const OrderTimeSchema = (minTime, maxTime) =>
  object().shape({
    time: string()
      .required(i18next.t('Required'))
      .test(
        'valid-time',
        i18next.t('TakeawayTimeError', {
          minTime,
          maxTime,
        }),
        function(time) {
          return minTime <= time && maxTime >= time;
        }
      ),
  });
