import { createStore, bindActionCreators } from "redux";

const initialState = { value: 0 };
const INCREMENT = "INCREMENT";
const ADD = "ADD";

const incrementAction = { type: INCREMENT };

const increment = () => ({ type: INCREMENT });
const add = amount => ({ type: ADD, payload: amount });

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

// It may become tedious to always write store.dispatch(increment())
// So we can bind these actions to the dispatch

const actions = bindActionCreators({ increment, add }, store.dispatch);

actions.increment();
actions.add(1000);

console.log(store.getState());
