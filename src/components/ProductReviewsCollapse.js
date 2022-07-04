import React from 'react';
import { Collapse, List } from '@material-ui/core';
import ReviewItem from './ReviewItem';
import { makeStyles } from '@material-ui/core/styles';
import { array, bool } from 'prop-types';

const useStyles = makeStyles(() => ({
  collapse: {
    width: '100%',
  },
  list: {
    overflow: 'auto',
    maxHeight: 180,
    marginTop: 8,
    paddingTop: 0,
    paddingBottom: 0,
  },
}));

const ProductReviewsCollapse = ({
  reviews,
  collapseIn,
}) => {
  const styles = useStyles();

  return (
    <Collapse
      timeout="auto"
      unmountOnExit
      className={styles.collapse}
      in={collapseIn}
    >
      <List className={styles.list}>
        {reviews.map(review => (
          <ReviewItem key={review.id} {...review} />
        ))}
      </List>
    </Collapse>
  );
};

ProductReviewsCollapse.propTypes = {
  reviews: array,
  collapseIn: bool,
};

ProductReviewsCollapse.defaultProps = {
  reviews: [],
  collapseIn: false,
};

export default ProductReviewsCollapse;
