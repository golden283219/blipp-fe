import { useQuery } from '@apollo/client';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { CategoryStructure, CategoryTypes } from '~types';
import { GET_SUBCATEGORY_BY_PARENT } from '../graphql/queries';
import CategoryItem from './CategoryItem';

interface SubCategoryProps {
  name: string;
  id: string;
  route: string;
  categoryType: CategoryTypes;
}

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.margins.marginToHeader,
    marginBottom: 8,
  },
}));

const SubCategory: React.FC<SubCategoryProps> = ({
  id,
  route,
  categoryType,
}) => {
  const styles = useStyles();

  const { data, loading } = useQuery(
    GET_SUBCATEGORY_BY_PARENT,
    {
      variables: { parentCategoryId: Number(id) },
    }
  );

  if (loading) return null;

  return (
    <Grid
      container
      className={styles.container}
      alignItems="center"
      spacing={2}
    >
      {data.itemSubcategories.map(
        (item: CategoryStructure) => {
          const fetchChildCategories =
            item.subCategoryIds &&
            item.subCategoryIds.length > 0;
          return (
            <Grid key={item.id} item xs={6}>
              <CategoryItem
                fetchChildCategories={fetchChildCategories}
                title={item.name}
                id={item.id}
                route={route}
              />
            </Grid>
          );
        }
      )}
    </Grid>
  );
};

export default SubCategory;
