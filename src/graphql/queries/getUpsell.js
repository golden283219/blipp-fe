import { gql } from '@apollo/client';

export default gql`
  query getUpsell($itemId: Float!) {
    itemsUpsell(id: $itemId) {
      id
      name
      price
      description
      diet
      upSellIds
      productGroupId
      itemVariants {
        id
        isMultiSelect
        isRequired
        name
        itemVariantOptions {
          id
          name
          price
        }
      }
      productGroup {
        name
      }
    }
  }
`;
