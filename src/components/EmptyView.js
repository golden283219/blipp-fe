import {
  Box,
  Button,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import { string, func } from 'prop-types';

const useStyles = makeStyles(theme => ({
  container: {
    height: '100vh',
    backgroundColor: theme.palette.primary.main,
  },
  containerInner: {
    borderRadius: 100,
    width: '95%',
    height: '95%',
    backgroundColor: theme.palette.secondary.main,
  },
}));

const EmptyView = ({ title, buttonTitle, onClick }) => {
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
      <Grid
        item
        container
        justify="center"
        alignItems="center"
        direction="column"
        className={classes.containerInner}
      >
        <FastfoodIcon color="primary" fontSize="large" />
        <Box mt={5}>
          <Typography color="primary">
            {t(title)}
          </Typography>
        </Box>
        <Box mt={3}>
          <Button
            variant="outlined"
            color="primary"
            onClick={onClick}
          >
            {t(buttonTitle)}
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

EmptyView.propTypes = {
  title: string,
  buttonTitle: string,
  onClick: func,
};

export default EmptyView;
