import { gql } from '@apollo/client';

export default gql`
  query getReceipts(
    $restaurantId: Float!
    $customerId: Float!
  ) {
    receipts(
      filter: {
        where: {
          restaurantId: $restaurantId
          customerId: $customerId
        }
      }
    ) {
      id
      restaurantName
      address
      restaurantPhoneNumber
      orgnr
      date
      sn
      ka
      cardType
      cardNumber
      items {
        name
        price
        productGroupId
        quantity
        allergies
        variants {
          name
          price
        }
      }
      total
      rounding
      receiptVat {
        vat
        gross
      }
      paymentMethod
      receiptCurrency {
        locale
        currency
      }
      deliveryType
      isReturnReceipt
      deliveryCostInfo
    }
  }
`;
