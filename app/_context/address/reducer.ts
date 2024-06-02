import { DataType, ActionType, Actions } from "./types";

export const reducer = (state: DataType, action: ActionType) => {
  switch (action.type) {
    case Actions.SET_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: action.payload.shippingAddress };

    default:
      return state;
  }
};
