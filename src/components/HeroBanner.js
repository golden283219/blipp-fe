import { string } from 'prop-types';
import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  image: {
    height: 250,
    width: '100%',
    objectFit: 'cover',
  },
}));

const HeroBanner = ({ imageUrl }) => {
  const styles = useStyles();
  return (
    <img src={imageUrl} className={styles.image}></img>
  );
};

HeroBanner.propTypes = {
  imageUrl: string,
};

HeroBanner.defaultProps = {
  imageUrl: '',
};

export default HeroBanner;
