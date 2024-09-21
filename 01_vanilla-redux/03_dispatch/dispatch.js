import { createStore } from "redux";

const initialState = { value: 0 };
const INCREMENT = "INCREMENT";
const ADD = "ADD";

const incrementAction = { type: INCREMENT };

const increment = () => ({ type: INCREMENT });
const add = amount => ({ type: ADD, payload: amount });

// Rules for reducers:
// - no mutating objects, always return a new object if you are changing something in the state
// - must return something, even just the original state
// - it's just a JS function
const reducer = (state = initialState, action) => {
  if (action.type === INCREMENT) {
    return { value: state.value + 1 };
  }

  if (action.type === ADD) {
    return { value: state.value + action.payload };
  }

  return state;
};

const store = createStore(reducer);

// dispatch sends actions to your store
// you just need to
store.dispatch(increment());
store.dispatch(increment());

console.log(store.getState());
