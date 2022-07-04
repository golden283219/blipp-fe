import { gql } from '@apollo/client';

export default gql`
  mutation addOrder(
    $restaurantId: Float!
    $customerId: Float!
    $tableId: Float
    $deliveryType: String!
    $paymentMethod: String!
    $address: String
    $zipCode: String
    $orderTime: String
    $phoneNumber: String
  ) {
    postOrders(
      newOrderInput: {
        restaurantId: $restaurantId
        customerId: $customerId
        tableId: $tableId
        deliveryType: $deliveryType
        paymentMethod: $paymentMethod
        extraInfo: {
          address: $address
          zipCode: $zipCode
          orderTime: $orderTime
          phoneNumber: $phoneNumber
        }
      }
    ) {
      id
    }
  }
`;
