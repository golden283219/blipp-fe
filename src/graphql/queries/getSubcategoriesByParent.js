import { gql } from '@apollo/client';

export default gql`
    query getSubcategoriesByParent($parentCategoryId: Float!) {
        itemSubcategories(filter: {where: {parentSubcategoryId: $parentCategoryId}}) {
            id
            name
            category
            parentSubcategoryId
            subCategoryIds
        }
    }
`;
