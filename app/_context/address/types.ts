import { Address } from "@prisma/client";
import { Dispatch, ReactNode } from "react";

export type DataType = {
  shippingAddress: Address | null;
};

export type ActionType = {
  type: Actions;
  payload?: any;
};

export type ContextType = {
  state: DataType;
  dispatch: Dispatch<ActionType>;
};

export type ProviderType = {
  children: ReactNode;
};
export enum Actions {
  SET_SHIPPING_ADDRESS,
}
