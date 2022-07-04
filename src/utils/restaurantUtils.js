export const createCurrencyFormat = ({
  currency,
  locale,
}) => {
  const { format } = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  });
  return format;
};
