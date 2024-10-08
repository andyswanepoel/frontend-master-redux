import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false
};

const ENDPOINT = "https://star-wars-characters.glitch.me/api/search";

export const fetchCharactersFromAPI = createAsyncThunk(
  "characters/fetchCharacters",
  async searchTerm => {
    const response = await fetch(ENDPOINT + "/" + searchTerm);
    const data = await response.json();
    return data.results;
  }
);

export const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    add: (state, action) => {
      state.characters = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchCharactersFromAPI.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchCharactersFromAPI.pending, state => {
      state.loading = true;
    });
  }
});
