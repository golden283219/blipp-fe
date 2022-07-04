import { gql } from '@apollo/client';

export default gql`
  mutation getPayment(
    $orderId: Float!
    $paymentType: String!
    $phoneNumber: String
  ) {
    patchOrdersGetPayment(
      ordersGetPaymentInput: {
        orderId: $orderId
        paymentType: $paymentType
        phoneNumber: $phoneNumber
      }
    )
  }
`;
