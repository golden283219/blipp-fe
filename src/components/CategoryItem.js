import {
  CardContent,
  Grid,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { navigate } from 'gatsby';
import { bool, number, string } from 'prop-types';
import React from 'react';
import { Routes } from '../types/routes';
import { dynamicNavigate } from '../utils/routeHelper.ts';
import DefaultCard from './DefaultCard';

const useStyles = makeStyles({
  cardContent: {
    height: '100px',
  },
  gridContainer: {
    height: '100px',
  },
});

const CategoryItem = ({
  title,
  fetchChildCategories,
  id,
  route,
}) => {
  const styles = useStyles();

  const handleClick = () => {
    if (!fetchChildCategories) {
      dynamicNavigate(`${Routes.ITEMS}?id=${id}`);
    } else {
      navigate(id);
    }
  };

  return (
    <DefaultCard>
      <CardContent
        className={styles.cardContent}
        onClick={handleClick}
      >
        <Grid
          container
          alignItems="center"
          justify="center"
          className={styles.gridContainer}
        >
          <Grid item>
            <Typography variant="body1" align="center">
              {title}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </DefaultCard>
  );
};

CategoryItem.propTypes = {
  title: string,
  fetchChildCategories: bool,
  id: number,
  route: string,
};

CategoryItem.defaultProps = {
  title: '',
  fetchChildCategories: false,
};

export default CategoryItem;
