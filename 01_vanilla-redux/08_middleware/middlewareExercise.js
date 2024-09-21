// Let's create a middleware that logs performance, similar to the enhancer
// I'll copy the base from the middleware.js file

import { applyMiddleware, createStore } from "redux";

const INCREMENT = "INCREMENT";
const initalState = { value: 0 };
const reducer = (state = initalState, action) => {
  if (action.type === INCREMENT) {
    return { value: state.value + 1 };
  }
  return state;
};

const logMiddleware = store => next => action => {
  console.log("Action: ", action.type);
  console.log("Previous state: ", store.getState());
  next(action);
  console.log("New state: ", store.getState());
};

const performanceMiddleware = store => next => action => {
  const start = performance.now();
  next(action);
  console.log("Execution time: ", performance.now() - start);
};

// When you add middleware, you need to use applyMiddleware to turn it into an enhancer
// It will call them in order, so logMiddleware, then performance middleware, etc.
const store = createStore(
  reducer,
  applyMiddleware(logMiddleware, performanceMiddleware)
);

store.dispatch({ type: INCREMENT });
