import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchDogFacts } from "../../utilities";

export const fetchDogFactsFromAPI = createAsyncThunk(
  "dogFacts/fetchFacts",
  async count => {
    const facts = await fetchDogFacts(count);
    return facts;
  }
);
export const dogFactsSlice = createSlice({
  name: "dogFacts",
  initialState: {
    facts: [],
    loading: false
  },
  extraReducers: builder => {
    builder.addCase(fetchDogFactsFromAPI.pending, (state, action) => {
      // loading
      state.loading = true;
    });
    builder.addCase(fetchDogFactsFromAPI.fulfilled, (state, action) => {
      state.facts = action.payload;
      state.loading = false;
    });
  }
});
