import { createStore } from "redux";

// To create a store, we need to pass a reducer to the createStore
// What is a reducer?
// You have an existing state and a new thing that happened (action)
// Creates a new state

const initialState = { value: 0 };

// Actions ONLY need to have a type
// You can add anything else you want
// Sometimes you will see people using payload, meta, and error

// Often you will see developers create constants for each of the actions
// This helps prevent errors in typing
const INCREMENT = "INCREMENT";
const ADD = "ADD";

const incrementAction = { type: INCREMENT };

// Actions creators are functions that return actions
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

console.log(store);
