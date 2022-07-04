import { gql } from '@apollo/client';

export default gql`
  query getItemsBySubcategory($subcategoryId: Float!) {
    itemSubcategoryItems(id: $subcategoryId) {
      id
      name
      price
      description
      diet
      spicy
      imageUrl
      upSellIds
      productGroupId
      productGroup {
        name
      }
    }
  }
`;
