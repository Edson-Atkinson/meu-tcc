import { useContext } from "react";
import { AppContext } from ".";
import { Actions } from "./types";
import { Address } from "@prisma/client";

export const useAppContext = () => {
  const { state, dispatch } = useContext(AppContext);

  return {
    ...state,
    setShippingAddress: (shippingAddress: Address) => {
      dispatch({
        type: Actions.SET_SHIPPING_ADDRESS,
        payload: { shippingAddress },
      });
    },
  };
};
