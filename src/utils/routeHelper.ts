import { navigate } from 'gatsby';
import { Routes } from '../types/routes';
import isBrowser from './isBrowser';

const paths = [
  Routes.FOOD,
  Routes.BEVERAGE,
  Routes.ORDER,
  Routes.MORE,
] as string[];

export const getPathIndex = (path: string) => {
  const pathname = `/${path.split('/')[2]}`;
  if (pathname === Routes.ITEMS) return 0;
  return paths.indexOf(pathname);
};

export const getPath = (pageIndex: number): string =>
  paths[pageIndex];

const excludeHeaderPaths = [
  Routes.SETTINGS,
  Routes.RECEIPTS,
  Routes.RECEIPTDETAILS,
  Routes.NOTFOUND,
  Routes.ABOUT,
  Routes.CONDITIONS,
  Routes.MORE,
  Routes.ACTIVEORDERS,
  Routes.ORDERSTATUS,
];

export const getExcludedPaths = () =>
  excludeHeaderPaths.map(path => dynamicPath(path));

export const ROUTE_INDEX = 'page';

export const redirectMessenger = (
  messengerUrl: Location
) => {
  if (typeof window.orientation !== 'undefined') {
    setTimeout(() => {
      dynamicNavigate(Routes.FOOD);
    }, 100);
    window.location = messengerUrl;
    return;
  }
  dynamicNavigate(Routes.FOOD);
};

export const dynamicNavigate = (path: string) =>
  navigate(dynamicPath(path));

export const dynamicPath = (path: string) => {
  const restaurantSlug = getRestaurantSlug();
  return `/${restaurantSlug}${path}`;
};

export const getRestaurantSlug = () =>
  isBrowser() && window.location.pathname.split('/')[1];
