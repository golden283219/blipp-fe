import { EDeliveryType, IRestaurant } from 'src/models';
import { DeliveryType, Values } from '~types';

export const getpreparationTime = (
  restaurant: IRestaurant,
  deliveryType: EDeliveryType
): number => {
  const { preparationTimes } = restaurant;
  const preparationTime = preparationTimes?.find(
    item => item.deliveryType === deliveryType
  );
  return preparationTime?.time ?? 0;
};

export const getOrderTotalWithCurrency = (
  orderItems: { totalPrice: number; quantity: number }[],
  currency: string
): string => {
  if (!currency || !orderItems) return '';

  const total = orderItems.reduce(
    (total: number, item) =>
      total + item.totalPrice * item.quantity,
    0
  );
  return `${Math.round(total)} ${currency}`;
};

export const getOrderCompleteDialogDesc = (
  deliveryType: string
): string => {
  switch (deliveryType) {
    case DeliveryType.RESERVATION:
      return 'OrderCompleteReservation';
    case DeliveryType.DELIVERY:
      return 'OrderCompleteDelivery';
    case DeliveryType.TAKEAWAY:
      return 'OrderCompleteTakeaway';
    default:
      return '';
  }
};

export const valueChangeHandler = (
  values: Values,
  target: HTMLInputElement,
  changedNumber?: number
) => {
  let changedValue = {};
  const { name, type, id, checked, value } = target;
  let { totalPrice, variants, allergies } = values;
  const isAllergy = id === 'allergies';

  if (type === 'checkbox') {
    const arr = isAllergy
      ? allergies
      : variants[id].options;
    const checkedArray = arr.map(i =>
      i.name === name ? { ...i, checked } : i
    );

    const price = parseInt(value);
    totalPrice += checked ? price : -price;
    if (isAllergy) {
      changedValue = {
        ...values,
        totalPrice,
        allergies: checkedArray,
      };
    } else {
      changedValue = {
        ...values,
        totalPrice,
        variants: {
          ...variants,
          [id]: { ...variants[id], options: checkedArray },
        },
      };
    }
  } else if (name === 'specialRequest') {
    changedValue = {
      ...values,
      [name]: value,
    };
  } else {
    const removedOption = variants[id].options.find(
      i => i.checked
    );
    const options = variants[id].options.map(option => ({
      ...option,
      checked: option.name === name,
    }));
    const item = options.find(i => i.name === name);
    const priceToRemove = removedOption
      ? removedOption?.price
      : 0;
    const totalPrice =
      values.totalPrice + item.price - priceToRemove;
    changedValue = {
      ...values,
      totalPrice,
      variants: {
        ...variants,
        [id]: { ...variants[id], options },
      },
    };

    if (changedNumber && changedNumber > 0) {
      changedNumber = changedNumber - 1;
    }
  }
  return { changedValue, changedNumber };
};

export const deliveryFormFields = {
  address: 'address',
  zipCode: 'zipCode',
  phoneNumber: 'phoneNumber',
};

export const createCustomerFormFields = {
  firstName: 'firstName',
  lastName: 'lastName',
  email: 'email',
};

export const filterOrderFormValues = (values: any) => {
  let formValues = {};
  if (createCustomerFormFields.firstName in values) {
    const {
      [createCustomerFormFields.firstName]: firstName,
      [createCustomerFormFields.lastName]: lastName,
      [createCustomerFormFields.email]: email,
    } = values;
    formValues = {
      ...formValues,
      createCustomerFields: {
        firstName,
        lastName,
        email,
      },
    };
  }
  if (deliveryFormFields.address in values) {
    const {
      [deliveryFormFields.address]: address,
      [deliveryFormFields.zipCode]: zipCode,
      [deliveryFormFields.phoneNumber]: phoneNumber,
    } = values;
    formValues = {
      ...formValues,
      deliveryFields: { address, zipCode, phoneNumber },
    };
  }else{
    const {
      [deliveryFormFields.phoneNumber]: phoneNumber,
    } = values;
    formValues = {
      ...formValues,
      deliveryFields: { phoneNumber },
    };
  }
  return formValues;
};

export const getFormValues = (formikRef: any) => {
  if (!formikRef) return null;
  if (!formikRef.isValid) {
    formikRef.handleSubmit();
    return null;
  }
  return filterOrderFormValues(formikRef.values);
};

export const getOrderFromInitialValues = (
  customerId?: number,
  deliveryType?: string
) => {
  if (!customerId && deliveryType === 'DELIVERY') {
    return {
      [deliveryFormFields.address]: '',
      [deliveryFormFields.zipCode]: '',
      [deliveryFormFields.phoneNumber]: '',
      [createCustomerFormFields.firstName]: '',
      [createCustomerFormFields.lastName]: '',
      [createCustomerFormFields.email]: '',
    };
  }
  if (deliveryType === 'DELIVERY') {
    return {
      [deliveryFormFields.address]: '',
      [deliveryFormFields.zipCode]: '',
      [deliveryFormFields.phoneNumber]: '',
    };
  }
  if (!customerId) {
    return {
      [createCustomerFormFields.firstName]: '',
      [createCustomerFormFields.lastName]: '',
      [createCustomerFormFields.email]: '',
      [deliveryFormFields.phoneNumber]: '',
    };
  }
  return {
    [deliveryFormFields.phoneNumber]: '',
  };
 
  
};
