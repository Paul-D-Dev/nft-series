import { AppState }       from "../index";
import { createSelector } from "@ngrx/store";
import { CartState }      from "./cart.reducer";

export const selectFeature = (state: AppState) => state.cart;

export const selectCart = createSelector(selectFeature, (state: CartState) => state.items)
