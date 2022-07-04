import React, { useContext } from 'react';
import { object, func, array } from 'prop-types';
import {
  CardContent,
  Typography,
  CardMedia,
  Grid,
  ListItem,
  Badge,
  Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DefaultCard from './DefaultCard';
import SpiceIcons from './SpiceIcons';
import AppContext from '../contexts/AppContext';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: 125,
  },
  cardContent: {
    width: '100%',
  },
  img: {
    width: '100%',
    objectFit: 'cover',
  },
  expand: {
    padding: 0,
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  title: {
    display: 'inline-block',
  },
  expandOpen: {
    padding: 0,
    transform: 'rotate(180deg)',
  },
  reviewsButton: {
    fontSize: 12,
    padding: 0,
    alignItems: 'end',
  },
  badge: {
    position: 'absolute',
    top: 0,
  },
}));

const ProductItem = ({ item, onClick }) => {
  const { formatPrice } = useContext(AppContext);
  const styles = useStyles();
  return (
    <ListItem onClick={onClick}>
      <DefaultCard className={styles.root}>
        <Grid container>
          {item.imageUrl && (
            <Grid item container xs={5}>
              <CardMedia
                className={styles.img}
                image={item.imageUrl}
              />
            </Grid>
          )}
          <Grid xs item container>
            <CardContent className={styles.cardContent}>
              <Grid item container>
                <Grid xs item>
                  <Typography
                    variant="body2"
                    className={styles.title}
                  >
                    <b>{item.name}</b>
                  </Typography>
                  {item.spicy && (
                    <SpiceIcons spiceLevel={item.spicy} />
                  )}
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="caption">
                  {item.description}
                </Typography>
              </Grid>
              <Grid item>
                {item.diet && (
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    paragraph
                  >
                    {item.diet}
                  </Typography>
                )}
              </Grid>
              <Grid item container direction="column">
                <Grid item container alignItems="baseline">
                  {item.price > 0 && (
                    <Grid xs item>
                      <Typography variant="body1">
                        <b>{formatPrice(item.price)}</b>
                      </Typography>
                    </Grid>
                  )}

                  {/* <Grid item>
                    {ratings.count > 0 && (
                      <>
                        <Button
                          className={styles.reviewsButton}
                          onClick={handleExpandClick}
                          aria-expanded={expanded}
                          endIcon={
                            <ExpandMoreIcon
                              className={
                                expanded
                                  ? styles.expandOpen
                                  : styles.expand
                              }
                              fontSize="small"
                            />
                          }
                        >
                          {`${ratings.count} 
                      ${
                        ratings.count === 1
                          ? t('Review').toLowerCase()
                          : t('Reviews').toLowerCase()
                      }`}
                        </Button>
                      </>
                    )}
                  </Grid> */}
                </Grid>
              </Grid>
            </CardContent>
          </Grid>
          {/* <Grid item container>
            <ProductReviewsCollapse
              reviews={reviews}
              collapseIn={expanded}
            />
          </Grid> */}
        </Grid>
        {item.quantity && (
          <Box className={styles.badge}>
            <Badge
              badgeContent={item.quantity}
              color="primary"
            />
          </Box>
        )}
      </DefaultCard>
    </ListItem>
  );
};

ProductItem.propTypes = {
  item: object.isRequired,
  onClick: func.isRequired,
  reviews: array,
};

ProductItem.defaultProps = {
  reviews: [],
};

export default ProductItem;
