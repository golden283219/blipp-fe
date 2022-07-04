import React from 'react';
import { Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import checkmark from '../images/checkmark.png';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    opacity: isComplete => (isComplete ? 1 : 0.7),
  },
  checkmark: {
    width: 20,
    height: 20,
    marginRight: 8,
    opacity: isComplete => (isComplete ? 1 : 0.2),
  },
});

const OrderStatusRow = ({ title, isComplete }) => {
  const styles = useStyles(isComplete);
  return (
    <Box className={styles.container}>
      <img
        className={styles.checkmark}
        src={checkmark}
        alt="checkmark icon"
      />
      <Typography
        variant="caption"
        className={styles.title}
      >
        {title}
      </Typography>
    </Box>
  );
};
export default OrderStatusRow;
