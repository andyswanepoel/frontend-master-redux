import { produce } from "immer";
import {
  ITEM_ADDED,
  ITEM_PRICE_UPDATED,
  ITEM_QUANTITY_UPDATED,
  ITEM_REMOVED
} from "./actions";
let id = 1;

export const initialItems = [
  { uuid: id++, name: "Awesome Tofu Roast", price: 14, quantity: 1 },
  { uuid: id++, name: "Vegan Ham Sandwich", price: 12, quantity: 1 }
];

// export const reducer = (items = initialItems, action) => {
//   // with immer, you can mutate the draft state object
//   // it will go make the changes immutable for you
//   if (action.type === ITEM_ADDED) {
//     return produce(items, draftItems => {
//       const item = { uuid: id++, quantity: 1, ...action.payload };
//       draftItems.push(item);
//     });
//   }

//   if (action.type === ITEM_REMOVED) {
//     return items.filter(item => item.uuid !== action.payload.uuid);
//   }

//   if (action.type === ITEM_PRICE_UPDATED) {
//     return produce(items, draftItems => {
//       const item = draftItems.find(item => item.uuid === action.payload.uuid);
//       item.price = parseInt(action.payload.price, 10);
//     });
//   }

//   if (action.type === ITEM_QUANTITY_UPDATED) {
//     return produce(items, draftItems => {
//       const item = draftItems.find(item => item.uuid === action.payload.uuid);
//       item.quantity = action.payload.quantity;
//     });
//   }

//   return items;
// };

// You could see the above getting a bit tedious to have to return the produce function result each time.
// produce can also wrap your whole reducer so that you don't have to call it each time
// this way the "state" that you're editing is actually the mutable version

// it takes you reducer and an initial state
// then you can freely update things in the state without worry

export const reducer = produce((items = initialItems, action) => {
  if (action.type === ITEM_ADDED) {
    const item = { uuid: id++, quantity: 1, ...action.payload };
    items.push(item);
  }

  if (action.type === ITEM_REMOVED) {
    // if you return, I believe it will use that new object
    // if you don't return it will just use the mutable state object
    return items.filter(item => item.uuid !== action.payload.uuid);
  }

  if (action.type === ITEM_PRICE_UPDATED) {
    const item = items.find(item => item.uuid === action.payload.uuid);
    item.price = parseInt(action.payload.price, 10);
  }

  if (action.type === ITEM_QUANTITY_UPDATED) {
    const item = items.find(item => item.uuid === action.payload.uuid);
    item.quantity = action.payload.quantity;
  }
}, initialItems);

export default reducer;
