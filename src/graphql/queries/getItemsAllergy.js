import { gql } from '@apollo/client';

export default gql`
  query getItemsAllergy($itemId: Float!) {
    itemsAllergy(id: $itemId) {
      id
      name
      removable
    }
  }
`;
