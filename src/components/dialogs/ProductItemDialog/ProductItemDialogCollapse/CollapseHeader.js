import React from 'react';
import { string, number } from 'prop-types';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  formGroup: {
    width: '100%',
  },
  expanded: {
    alignItems: 'center',
  },
  heading: {
    flex: 1,
  },
  secondaryHeading: {
    marginRight: theme.spacing(0.2),
  },
}));

const CollapseHeader = ({ expanded, price, title }) => {
  const styles = useStyles();
  return (
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls={`${expanded}bh-content`}
      id={`${expanded}bh-header`}
      classes={{
        expanded: styles.expanded,
      }}
    >
      <Typography
        variant="subtitle1"
        className={styles.heading}
      >
        {title}
      </Typography>
      {price > 0 && (
        <Typography
          variant="subtitle2"
          className={styles.secondaryHeading}
        >
          <i>{`+ ${price} kr`}</i>
        </Typography>
      )}
    </AccordionSummary>
  );
};

CollapseHeader.propTypes = {
  expanded: string.isRequired,
  price: number,
  title: string.isRequired,
};

CollapseHeader.defaultProps = {
  price: 0,
};

export default CollapseHeader;
