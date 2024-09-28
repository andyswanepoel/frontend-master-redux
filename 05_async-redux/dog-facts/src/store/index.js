import { configureStore } from "@reduxjs/toolkit";
import { dogFactsSlice } from "./dogFacts/dogFactsSlices";

export const store = configureStore({
  reducer: {
    dogFacts: dogFactsSlice.reducer
  }
});
