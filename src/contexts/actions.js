import {
  ADD_ITEM,
  EDIT_ITEM,
  REMOVE_ITEM,
  SET_DELIVERY_TYPE,
  RESET_ITEMS,
} from './actionTypes';

export const useActions = (state, dispatch) => ({
  setDeliveryType: payload =>
    dispatch({
      type: SET_DELIVERY_TYPE,
      payload,
    }),
  addItem: payload =>
    dispatch({
      type: ADD_ITEM,
      payload,
    }),
  editItem: payload =>
    dispatch({
      type: EDIT_ITEM,
      payload,
    }),
  deleteItem: payload =>
    dispatch({
      type: REMOVE_ITEM,
      payload,
    }),
  resetItems: () =>
    dispatch({
      type: RESET_ITEMS,
    }),
});
