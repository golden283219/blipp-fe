import { gql } from '@apollo/client';

export default gql`
  query searchItems(
    $restaurantId: Float!
    $searchString: String!
  ) {
    item(
      restaurantId: $restaurantId
      searchString: $searchString
    ) {
      id
      name
      description
      price
      itemSubcategoryId
      imageUrl
      productGroup {
        name
      }
    }
  }
`;
