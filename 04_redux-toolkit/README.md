# Redux Toolkit

Redux Toolkit is a library that simplifies a lot of boilerplate and common logic people usually set up with Redux, for example Redux Dev Tools, action creators, etc.

## Slices

Redux Toolkit allows you to split your state into slices, each set up with their own `initialState`, `reducers`, etc.

```js
const createUser = name => ({
  id: nanoid(),
  name
});

const initialState = [];

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    add: (state, action) => {
      const user = createUser(action.payload);
      state.push(user);
    }
  }
})
```

Anything added to the reducers will automatically get an action created made for it.

For example, to dispatch an `add` action, you can call it from any component.

```js
import { usersSlice } from "../store/usersSlice";

const CreateUser = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleOnSubmit = (event) => {
    event.preventDefault();
    dispatch(usersSlice.actions.add(name))
    setName("");
  }
  // rest of component skipped for brevity
}
```

### Creating your own actions

Redux Toolkit provides a `createAction` function that allows you to create actions outside of the `createSlice`'s `reducers`. It is useful if you need different logic than that provided out of the box with Redux Toolkit.

### Extra Reducers

You can add reducers that are not directly tied to the slice, i.e., not included in the `reducers` part, by including them in `extraReducers`.

You might use it for updating the slice's state on actions that are tied to another slice.

You have to add them with the `builder` callback function.

```js
import { tasksSlice } from "./tasksSlice";

const createUser = name => ({
  id: nanoid(),
  name
});

const initialState = [];

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    add: (state, action) => {
      const user = createUser(action.payload);
      state.push(user);
    }
  },
  extraReducers: builder => {
    builder.addCase(tasksSlice.actions.assignToUser, (state, action) => {
        const user = state.find(user => user.id === action.payload.userId);
        user.taskIds.push(action.payload.taskId)
    })
  }
})
```

In the above example, we assign a task to a user and it will happen on the dispatch of `tasksSlice.actions.assignToUser`

## Creating the store
These slices are added to the store using `configureStore`.

```js
import { usersSlice } from "./usersSlice";
import { tasksSlice } from "./tasksSlice";

export const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
    tasks: tasksSlice.reducer
  }
});
```