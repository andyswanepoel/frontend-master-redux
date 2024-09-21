import { createStore } from "redux";

const reducer = state => state;

// Third argument (or second if you don't include initialState) in createStore is store enhancer
// Enhancer is used to add additional functionality to createStore

// Let's create an enhancer to monitor the time to run a reducer
// This is a way to add functionality to redux
const monitorEnhancer = createStore => (reducer, initialState, enhancer) => {
  const monitoredReducer = (state, action) => {
    const start = performance.now();
    const newState = reducer(state, action);
    const end = performance.now();
    console.log("Time to run reducer: ", end - start);

    return newState;
  };

  return createStore(monitoredReducer, initialState, enhancer);
};

const store = createStore(reducer, monitorEnhancer);

store.dispatch({ type: "TEST" });
