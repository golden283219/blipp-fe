import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: 8,
    maxWidth: theme.breakpoints.values.lg,
    [theme.breakpoints.up('lg')]: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      margin: 'auto',
    },
  },
}));

const ListContainer = ({ children }) => {
  const styles = useStyles();
  return <Box className={styles.container}>{children}</Box>;
};

export default ListContainer;
