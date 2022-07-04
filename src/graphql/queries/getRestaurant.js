import { gql } from '@apollo/client';

export default gql`
  query getRestaurant($restaurantId: Float!) {
    restaurant(id: $restaurantId) {
      name
      address
      about
      coverImg
      currency {
        currency
        locale
      }
      deliveryStatus
      takeawayStatus
      reservationStatus
      messengerUrl
      preparationTimes {
        deliveryType
        time
      }
      openingHours {
        day
        openingHour
        closingHour
      }
      deliveryCost {
        cost
      }
    }
  }
`;
