import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CardContent, ListItem } from '@material-ui/core';
import DefaultCard from './DefaultCard';

const useStyles = makeStyles(() => ({
  card: {
    height: '100%',
  },
}));

const ListRow = ({ children }) => {
  const styles = useStyles();

  return (
    <ListItem>
      <DefaultCard className={styles.card}>
        <CardContent>{children}</CardContent>
      </DefaultCard>
    </ListItem>
  );
};

export default ListRow;
