import { CardNFT }           from "../../interfaces";
import { createReducer, on } from "@ngrx/store";
import { CartActions }       from "./cart.actions";

export interface CartState {
  items: CardNFT[];
}

const initialState: CartState = {
  items: []
}

export const cartReducer = createReducer(
  initialState,
  on(CartActions.add, (state, { item }) => {
    const items = [...state.items];
    const itemInCart: CardNFT | undefined = items.find(_item => _item.id === item.id);
    if (!itemInCart) {
      items.push(item);
    }
    return {
      items
    }
  }),
  on(CartActions.remove, (state, { item }) => {
    const filteredItems = state.items.filter(_item => _item.id !== item.id);
    return {
      items: filteredItems
    }
  }),
  on(CartActions.clear, () => ({
    items: []
  }))
)

