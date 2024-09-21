import { createStore } from "redux";

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

// Subscribers will run each time there is an update to the store
// How could this be useful? Maybe because state is very important for updating React components
const subscriber = () => console.log("SUBSCRIBER", store.getState());

store.subscribe(subscriber);

store.dispatch(increment());
store.dispatch(increment());
store.dispatch(add(1000));
