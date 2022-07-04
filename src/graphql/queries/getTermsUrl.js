import { gql } from '@apollo/client';

export default gql`
  query getTermsUrl($restaurantId: Float!) {
    termsUrls(
      filter: { where: { restaurantId: $restaurantId } }
    ) {
      url
    }
  }
`;
