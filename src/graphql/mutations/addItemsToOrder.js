import { gql } from '@apollo/client';

export default gql`
    mutation addItemsToOrder($orderId: Float!, $items: [NewOrderedItemInOrderInput]) {
        postOrderOrderedItems(id: $orderId, orderOrderedItemsInput: $items) {
            id
        }
    }
`;