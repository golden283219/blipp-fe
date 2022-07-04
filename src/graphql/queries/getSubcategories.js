import { gql } from '@apollo/client';

export default gql`
    query getSubcategories($restaurantId: Float!, $category: String!) {
        itemSubcategories(filter: {where: {restaurantId: $restaurantId, category: $category}}) {
            id
            name
            category
            parentSubcategoryId
            subCategoryIds
        }
    }
`;