import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Theme } from "@twilio-paste/core/theme";

import App from "./components/App";
import "./index.scss";
import { Provider } from "react-redux";
import { store } from "./store";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Theme.Provider>
      <StrictMode>
        <App />
      </StrictMode>
    </Theme.Provider>
  </Provider>
);
