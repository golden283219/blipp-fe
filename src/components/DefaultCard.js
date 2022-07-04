import React from 'react';
import { Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { node, string } from 'prop-types';

const useStyles = makeStyles(theme => ({
  card: {
    minHeight: 100,
    width: '100%',
    borderRadius: theme.borderRadius.main,
  },
}));

const DefaultCard = ({ children, className, ...props }) => {
  const styles = useStyles();

  return (
    <Card
      className={[styles.card, className].join(' ')}
      elevation={5}
      raised
      {...props}
    >
      {children}
    </Card>
  );
};

DefaultCard.propTypes = {
  children: node,
  className: string,
};

DefaultCard.defaultProps = {
  children: undefined,
  className: '',
};

export default DefaultCard;
