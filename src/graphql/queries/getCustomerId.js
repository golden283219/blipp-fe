import { gql } from '@apollo/client';

export default gql`
  query getCustomerId($messengerId: Float!) {
    customersValidate(messengerId: $messengerId) {
      id
    }
  }
`;
