import { AppState }       from "../index";
import { createSelector } from "@ngrx/store";
import { CartState }      from "./cart.reducer";

export const selectFeature = (state: AppState) => state.cart;

export const selectCart = createSelector(selectFeature, (state: CartState) => state.items)
export const selectTotalValueCart = createSelector(
  selectFeature,
  (state: CartState) =>
    state.items
      .map(item => item.price)
      .reduce((prev, current) => prev + current, 0)
);
export const selectCartTotalItem = createSelector(selectFeature, (state: CartState) => state.items.length);
