import { applyMiddleware, createStore } from "redux";

const INCREMENT = "INCREMENT";
const initalState = { value: 0 };
const reducer = (state = initalState, action) => {
  if (action.type === INCREMENT) {
    return { value: state.value + 1 };
  }
  return state;
};

// Enhancers are useful to change to whole functionality of redux, i.e., The Redux Dev Tools.
// Middleware is good for listening and doing something with certain actions coming through.
// You can do a bunch of stuff before it gets to the reducer or after it leaves the reducer

const logMiddleware = store => next => action => {
  // pre reducer
  console.log("Action: ", action.type);
  console.log("Previous state: ", store.getState());
  // moving to the next middleware, or dispatching the action if it is the last middleware
  next(action);
  // post reducer
  console.log("New state: ", store.getState());
};

// When you add middleware, you need to use applyMiddleware to turn it into an enhancer
const store = createStore(reducer, applyMiddleware(logMiddleware));

store.dispatch({ type: INCREMENT });
