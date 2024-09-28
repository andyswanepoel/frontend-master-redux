import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { Theme } from "@twilio-paste/core/theme";
import { store } from "./store";

import { App } from "./components/App";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Theme.Provider theme="default">
      <StrictMode>
        <App />
      </StrictMode>
    </Theme.Provider>
  </Provider>
);
