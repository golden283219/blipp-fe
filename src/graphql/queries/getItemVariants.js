import { gql } from '@apollo/client';

export default gql`
  query getItemVariants($itemId: Float!) {
    itemVariants(id: $itemId) {
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
    }
  }
`;
