// Let's write something that logs the state before and after running the reducer

import { compose, createStore } from "redux";

const INCREMENT = "INCREMENT";
const initalState = { value: 0 };
const reducer = (state = initalState, action) => {
  if (action.type === INCREMENT) {
    return { value: state.value + 1 };
  }
  return state;
};

const logEnhancer = createStore => (reducer, enhancer) => {
  const logReducer = (state, action) => {
    console.log("Action: ", action.type);
    console.log("Previous state: ", state);
    const newState = reducer(state, action);
    console.log("New state: ", newState);

    return newState;
  };
  return createStore(logReducer, enhancer);
};

const monitorEnhancer = createStore => (reducer, enhancer) => {
  const monitorReducer = (state, action) => {
    const start = performance.now();
    const newState = reducer(state, action);
    const end = performance.now();
    console.log("Time to run reducer: ", end - start);

    return newState;
  };

  return createStore(monitorReducer, enhancer);
};

// const store = createStore(reducer, loggingEnhancer);

// What if we wanted to run two enhancers?? ::thinking-face::
// We could compose the two of them.
const store = createStore(reducer, compose(monitorEnhancer, logEnhancer));

store.dispatch({ type: INCREMENT });
