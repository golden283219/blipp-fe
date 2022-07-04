import { gql } from '@apollo/client';

export default gql`
    query getBaseSubcategories($restaurantId: Float!, $category: String!) {
        itemSubcategories(filter: {where: {restaurantId: $restaurantId, category: $category, parentSubcategoryId: {lt: 0}}}) {
            id
            name
            category
            parentSubcategoryId
            subCategoryIds
        }
    }
`;
