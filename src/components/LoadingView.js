import {
  Box,
  Button,
  CircularProgress,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
  container: {
    height: '100vh',
  },
}));

const LoadingView = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      direction="column"
      className={classes.container}
    >
      <CircularProgress />
      <Box mt={2}>
        <Typography color="primary">
          {t('title_loading')}
        </Typography>
      </Box>
    </Grid>
  );
};

export default LoadingView;
