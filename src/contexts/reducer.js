import {
  ADD_ITEM,
  EDIT_ITEM,
  REMOVE_ITEM,
  SET_DELIVERY_TYPE,
  RESET_ITEMS,
} from './actionTypes';
import { v4 as uuidv4 } from 'uuid';

export default (state, action) => {
  switch (action.type) {
    case SET_DELIVERY_TYPE: {
      return {
        ...state,
        deliveryType: action.payload,
        shouldSelectDeliveryType: action.payload
          ? false
          : true,
      };
    }
    case ADD_ITEM:
      var item = {
        ...action.payload,
        itemId: action.payload.id,
        localId: uuidv4(),
      };
      return {
        ...state,
        items: {
          ...state.items,
          localItems: [...state.items.localItems, item],
        },
      };
    case REMOVE_ITEM:
      return {
        ...state,
        items: {
          ...state.items,
          localItems: state.items.localItems.filter(
            item => item.localId !== action.payload
          ),
        },
      };
    case EDIT_ITEM:
      return {
        ...state,
        items: {
          ...state.items,
          localItems: state.items.localItems.map(item => {
            if (item.localId === action.payload.localId) {
              return {
                ...item,
                ...action.payload,
              };
            } else return item;
          }),
        },
      };
    case RESET_ITEMS: {
      return {
        ...state,
        items: { ...state.items, localItems: [] },
      };
    }
    default:
      return state;
  }
};
