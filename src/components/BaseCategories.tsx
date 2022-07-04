import { useQuery } from '@apollo/client';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useContext } from 'react';
import AppContext from '~contexts/AppContext';
import { CategoryStructure, CategoryTypes } from '~types';
import { GET_BASE_SUBCATEGORIES } from '../graphql/queries';
import CategoryItem from './CategoryItem';

interface BaseCategoriesProps {
  categoryType: CategoryTypes;
  route: string;
}
const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.margins.marginToHeader,
    marginBottom: 8,
  },
}));

const BaseCategories: React.FC<BaseCategoriesProps> = ({
  categoryType,
  route,
}) => {
  const { restaurantId } = useContext(AppContext);
  const styles = useStyles();

  const { data, loading } = useQuery(
    GET_BASE_SUBCATEGORIES,
    {
      variables: {
        restaurantId,
        category: categoryType,
      },
    }
  );

  if (loading) return null;
  const categories = data.itemSubcategories;
  return (
    <Grid
      container
      className={styles.container}
      alignItems="center"
      spacing={2}
    >
      {categories.map((item: CategoryStructure) => {
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
      })}
    </Grid>
  );
};

export default BaseCategories;
