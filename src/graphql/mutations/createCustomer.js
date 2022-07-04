import { gql } from '@apollo/client';

export default gql`
  mutation createCustomer(
    $firstName: String!
    $lastName: String!
    $email: String!
  ) {
    postCustomers(
      newCustomerInput: {
        firstName: $firstName
        lastName: $lastName
        email: $email
      }
    ) {
      id
    }
  }
`;
