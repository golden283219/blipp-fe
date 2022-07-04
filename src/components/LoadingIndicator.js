import {
  Backdrop,
  CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

const LoadingIndicator = () => {
  const styles = useStyles();

  return (
    <Backdrop open className={styles.backdrop}>
      <CircularProgress />
    </Backdrop>
  );
};

export default LoadingIndicator;
