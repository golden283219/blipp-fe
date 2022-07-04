import {
  Box,
  Button,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { getPath, ROUTE_INDEX } from '~utils/routeHelper';
import SaladBowl from '../images/saladbowl.png';
import { dynamicNavigate } from '../utils/routeHelper';

const useStyles = makeStyles({
  container: {
    height: '70vh',
  },
  card: {
    boxShadow: '-1px 6px 15px -3px rgba(0,0,0,0.27)',
    padding: '16px',
    borderRadius: '4px',
  },
  infoText: {
    color: 'rgba(0, 0, 0, 0.54)',
  },
  button: {
    width: '100%',
    color: 'rgba(0, 0, 0, 0.54)',
  },
  imgContainer: {
    width: '100%',
    margin: '24px 0px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const NoOrdersView = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  const handlePageChange = () => {
    dynamicNavigate(getPath(0));
    localStorage.setItem(ROUTE_INDEX, '0');
  };

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      direction="column"
      className={classes.container}
    >
      <Box className={classes.card}>
        <Box mt={5}>
          <Typography
            className={classes.infoText}
            align="center"
          >
            {t('EmptyOrder')}
          </Typography>
        </Box>
        <Box className={classes.imgContainer}>
          <img src={SaladBowl} alt="salad bowl" />
        </Box>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => handlePageChange()}
        >
          {t('Go to menu')}
        </Button>
      </Box>
    </Grid>
  );
};

export default NoOrdersView;
