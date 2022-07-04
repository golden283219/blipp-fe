import { gql } from '@apollo/client';

export default gql`
  query getRestaurantBySlug($slug: String!) {
    restaurantsSlug(slug: $slug) {
      name
      address
      about
      id
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
    }
  }
`;
