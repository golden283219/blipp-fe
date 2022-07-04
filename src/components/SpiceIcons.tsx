import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import spiceIcon from '../images/chilli.png';

interface SpiceIconsProps {
  spiceLevel: number;
}

const useStyles = makeStyles(theme => ({
  titleContainer: {
    display: 'inline-block',
    marginLeft: 10,
    marginRight: 10,
  },
  spiceIcon: {
    width: 20,
    height: 20,
  },
}));

const SpiceIcons: React.FC<SpiceIconsProps> = ({
  spiceLevel,
}) => {
  const styles = useStyles();
  return (
    <div className={styles.titleContainer}>
      {Array.from(Array(spiceLevel).keys()).map(i => (
        <img
          key={i}
          className={styles.spiceIcon}
          src={spiceIcon}
          alt="spice icon"
        />
      ))}
    </div>
  );
};

export default SpiceIcons;
