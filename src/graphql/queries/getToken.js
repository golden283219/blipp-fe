import { gql } from '@apollo/client';

export default gql`
  query getToken($id: Float!) {
    getToken(id: $id) {
      token
    }
  }
`;
