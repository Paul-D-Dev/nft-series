import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { CardNFT }                              from "../../interfaces";

export const CartActions = createActionGroup({
  source: 'Cart',
  events: {
    add: props<{ item: CardNFT }>(),
    remove: props<{ item: CardNFT }>(),
    clear: emptyProps(),
  }
})
