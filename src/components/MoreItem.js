import {
  CardContent,
  Grid,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { func, string } from 'prop-types';
import React from 'react';
import { dynamicNavigate } from '../utils/routeHelper';
import DefaultCard from './DefaultCard';

const useStyles = makeStyles({
  cardContent: {
    height: '100px',
  },
  gridContainer: {
    height: '100px',
  },
});

const MoreItem = ({ title, path, handleClick }) => {
  const styles = useStyles();

  const navigateToPath = () => {
    dynamicNavigate(path);
  };

  return (
    <DefaultCard
      onClick={path ? navigateToPath : handleClick}
    >
      <CardContent className={styles.cardContent}>
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

MoreItem.propTypes = {
  title: string,
  path: string,
  handleClick: func,
};

MoreItem.defaultProps = {
  title: '',
  path: '',
};

export default MoreItem;
