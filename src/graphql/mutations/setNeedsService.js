import { gql } from '@apollo/client';

export default gql`
  mutation setNeedsService(
    $tableId: Float!
    $needsService: Boolean!
  ) {
    patchTable(
      id: $tableId
      tablePartialInput: { needsService: $needsService }
    ) {
      needsService
    }
  }
`;
