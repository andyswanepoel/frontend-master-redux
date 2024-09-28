# React with Redux Part 2

Here we took a deeper dive into some of the React with Redux patterns.

## Connecting store to presentational components

There is a pattern when working with `react-redux` that uses higher order components to pass state and dispatch functions as props to your components.

It is a different approach from the `useSelector` and `useDispatch`, since it has been around longer than hooks were a thing.

Some of the advantages it provides are that the components can be easily tested or used in a Storybook-like environment because as long as you're passing the props to the component, it doesn't need to know whether they came from the state or were hardcoded.

These containers rely mainly on:
- `connect`: a function provided from `react-redux`
- `mapStateToProps`: a function that takes your state (and optionally the props passed to the component) and returns an object of additional props to pass to the presentational component
- `mapDispatchToProps`: a function that takes your state (and optionally the props passed to the component) and returns an object of dispatch functions to pass to the presentation component

Usually, you'll see a component directory structure organized with a component and then a component container.

```
|___ src
  |___SummaryPanel
    |___SummaryPanel.jsx
    |___SummaryPanelContainer.jsx 

// Based on preference, people may call it ConnectedSummaryPanel.
```

## `connect`

The `connect` function creates a higher order component with some connection to your Redux store.

```js
import { SummaryPanel } from './SummaryPanel';
export const SummaryPanelContainer = connect()(SummaryPanel);
```

The function accepts two optional arguments: `mapStateToProps` and `mapDispatchToProps`. If neither are provided, you will still have access to `dispatch` in your presentational component.

## `mapStateToProps`

As mentioned, `mapStateToProps` is a function that accepts `state` and an optional `ownProps` and returns an object of props to pass to the presentational component.

```js
import { TodoList } from './TodoList';

const mapStateToProps = (state) => {
  const { todos } = state
  return { todoList: todos.allIds }
}

export default connect(mapStateToProps)(TodoList)
```

### Using selectors

Since you're constantly needed to get things from your state, the pattern of creating selectors has emerged. This allows the code to be reused and in case your state's structure changes, you only have to update your selector function.

In it's simplest form, a selector is a function that returns some part of the state.

```js
export const selectItems = state => state.items;  
```

You could then use this selector within your `mapStateToProps`

```js
import { selectItems } from './items/selectors';

const mapStateToProps = (state) => {
  return { items: selectItems(state) }
}
```

### Combining and optimizing selectors with `createSelector`

The reselect library offers a function called `createSelector` which allows your to build up selectors form other selectors. It memoizes the results and will only run the selector function again if any of the dependencies have update. It can be though of similar to a `useCallback` or `useMemo` hook in React.

```js
import { createSelector } from "reselect";

export const selectItems = state => state.items;

export const selectSubTotal = createSelector([selectItems], items =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0)
);
```

The second argument passed will be a function whose arguments are the return values of the items in the array.

## `mapDispatchToProps`

Similar to `mapStateToProps`, we use `mapDispatchToProps` to pass dispatch functions as props to your connected components.

### As an object of action creators

If the dispatch functions are simple, `mapDispatchToProps` can just be an object of action creators. React Redux will automatically add `dispatch` to the action creators

```js
import { Counter } from './Counter'
import { increment, decrement, reset } from './counterActions'

const actionCreators = {
  increment,
  decrement,
  reset,
}

export default connect(mapState, actionCreators)(Counter)
```

### As a function

If you need access to the `dispatch` or `ownProps`, you may need to use the function version of `mapDispatchToProps`.

This can be useful if you need additional information, or need to customize the functions. You just need to make sure the function signature matches that of the function used in the presentational component.

Here we're using `bindActionCreators` to add `dispatch` to each of the action creators.
```js
const mapDispatchToProps = (dispatch, ownProps) =>
  bindActionCreators(
    {
      remove: () => removeItem(ownProps.uuid),
      updatePrice: price => updateItemPrice(ownProps.uuid, price),
      updateQuantity: quantity => updateItemQuantity(ownProps.uuid, quantity)
    },
    dispatch
  );
```

I think that basically covers everything from these lessons. It was basically just showing the alternate to using the hooks `useSelector` and `useDispatch`.

## Immutability

As we've seen, whenever you update state you need to do it in an immutable way. You'll usually see:

```js

return {
  ...state,
  something: "different"
}
```

There are libraries that exist to allow you to mutate your state, at least it appears that way. One of those libraries is Immer. It is actually used in Redux Toolkit.

### Immer

So how do we use Immer? There are two ways in which we can use it:
- For each action in the reducer
- For the whole reducer

#### Each action

When using Immer per action, we will use `produce` function to get access to a `draftState` that we can mutate. Immer will then sort out all the changes that need to be done to the state in an immutable way.

```js
export const reducer = (items = initialItems, action) => {
  if (action.type === ITEM_ADDED) {
    return produce(items, draftItems => {
      const item = { uuid: id++, quantity: 1, ...action.payload };
      draftItems.push(item);
    });
  }
  if (action.type === ITEM_REMOVED) {
    return items.filter(item => item.uuid !== action.payload.uuid);
  }

  if (action.type === ITEM_PRICE_UPDATED) {
    return produce(items, draftItems => {
      const item = draftItems.find(item => item.uuid === action.payload.uuid);
      item.price = parseInt(action.payload.price, 10);
    });
  }

  if (action.type === ITEM_QUANTITY_UPDATED) {
    return produce(items, draftItems => {
      const item = draftItems.find(item => item.uuid === action.payload.uuid);
      item.quantity = action.payload.quantity;
    });
  }

  return items;
}
```

#### Entire reducer

We can also use the `produce` function on the entire reducer and then just mutate the state. You can still do things in an immutable way, for example in the `ITEM_REMOVED` action. However, if you don't return anything, I believe it will just return the state. Notice how in this example, we don't have to return the state at the end.

```js
export const reducer = produce((items = initialItems, action) => {
  if (action.type === ITEM_ADDED) {
    const item = { uuid: id++, quantity: 1, ...action.payload };
    items.push(item);
  }

  if (action.type === ITEM_REMOVED) {
    return items.filter(item => item.uuid !== action.payload.uuid);
  }

  if (action.type === ITEM_PRICE_UPDATED) {
    const item = items.find(item => item.uuid === action.payload.uuid);
    item.price = parseInt(action.payload.price, 10);
  }

  if (action.type === ITEM_QUANTITY_UPDATED) {
    const item = items.find(item => item.uuid === action.payload.uuid);
    item.quantity = action.payload.quantity;
  }
}, initialItems);
```