import { makeStyles } from '@material-ui/core';
import React from 'react';
import {
  BottomNavigation as MuiBottomNavigation,
  BottomNavigationAction,
  Badge,
  Box,
} from '@material-ui/core';
import {
  Fastfood,
  LocalBar,
  MoreHoriz,
  ShoppingCart,
} from '@material-ui/icons';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
  bottomNavigation: {
    borderTop: '1px solid lightgrey',
    position: 'fixed',
    bottom: 0,
    width: '100%',
    zIndex: theme.zIndex.appBar,
    height: '85px',
  },
}));

interface IBottomNavigation {
  currentPageIndex: number;
  onChange: (
    event: React.ChangeEvent<{}>,
    value: string
  ) => void;
  cartBadgeNumber: number;
}

const BottomNavigation: React.FC<IBottomNavigation> = ({
  currentPageIndex,
  onChange,
  cartBadgeNumber,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <MuiBottomNavigation
      className={classes.bottomNavigation}
      value={currentPageIndex}
      onChange={onChange}
      showLabels={true}
    >
      <BottomNavigationAction
        label={t('Food')}
        icon={<Fastfood />}
      />
      <BottomNavigationAction
        label={t('Beverage')}
        icon={<LocalBar />}
      />
      <BottomNavigationAction
        label={t('Order')}
        icon={
          <Badge
            badgeContent={cartBadgeNumber}
            color="primary"
          >
            <ShoppingCart />
          </Badge>
        }
      />
      <BottomNavigationAction
        label={t('More')}
        icon={<MoreHoriz />}
      />
    </MuiBottomNavigation>
  );
};

export default BottomNavigation;
