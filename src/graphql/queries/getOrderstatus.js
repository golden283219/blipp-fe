import { gql } from '@apollo/client';

export default gql`
  query GetOrderStatus(
    $customerId: Float!
    $restaurantId: Float!
  ) {
    ordersStatus(
      filter: {
        where: {
          customerId: $customerId
          restaurantId: $restaurantId
        }
      }
    ) {
      id
      createdAt
      foodStatus
      drinkStatus
    }
  }
`;
