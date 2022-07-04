import { gql } from '@apollo/client';

export default gql`
  mutation getPaymentStatus(
    $orderId: Float!
    $paymentType: String!
  ) {
    patchOrderGetPaymentStatus(
      id: $orderId
      orderGetPaymentStatusInput: {
        paymentType: $paymentType
      }
    ) {
      paymentConfirmation
    }
  }
`;
