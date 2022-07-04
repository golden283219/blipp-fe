export const validatePhoneNumber = (number: string) => {
  const phoneNumber = number.replace(/\s/g, '');
  const regex = new RegExp(/^\+[1-9]{1}[0-9]{8,14}$/);
  if (!regex.test(phoneNumber))
    return {
      errMsg: 'InvalidPhoneNumber',
      isValid: false,
      phoneNumber,
    };

  return { errMsg: '', isValid: true, phoneNumber };
};
