# Async Redux

Redux Toolkit provides a built in way to deal with async action, for example fetching data from an API.

## `createAsyncThunk`

Redux Toolkit provides a function to create async actions. It provides actions for `pending`, `fulfilled`, and `rejected` states.

```js
export const fetchFactsFromAPI = createAsyncThunk(
  "facts/fetchFacts",
  async count => {
    const facts = await fetchFacts(count);
    return facts;
  }
);
```

## Adding to `extraReducers`

Since this action will not be part of the slice's reducer, we need to add it to the `extraReducers`.

```js
export const factsSlice = createSlice({
  name: "facts",
  initialState: {
    data: [],
    loading: false
  },
  extraReducers: builder => {
    builder.addCase(fetchFactsFromAPI.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchFactsFromAPI.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
  }
});
```

## Dispatching the action

You can dispatch the action in the same way you would other actions.

```js
export const App = () => {
  const facts = useSelector(state => state.data.facts);
  const dispatch = useDispatch();

  const handleSubmit = number => {
    dispatch(fetchDogFactsFromAPI(number));
  };
  // rest of component skipped for brevity
}
```
