import { createStore } from "redux";

import { reducer } from "./reducer";

// You may want to not ship this to production, so you could check the environment

export const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
