# React with Redux

For the most part, this was very similar to plain Redux. 

We created a simple counter, which could increment, decrement, and set a value.

## Basic Set Up

We set up the following using nothing but the `redux` library and JavaScript:
1. [actions](./src/actions.js)
2. [reducer](./src/reducer.js)
3. [store](./src/store.js)

## Introducing Redux into React

Using the `react-redux` library, we were able to combine the our store with our React code.

The `Provider` component wraps our application and gives all of our components access to the store. Internally, it uses React's Context API.

```js
import { Provider } from 'react-redux';
import { store } from './store';

const AppWithRedux = () => (
    <Provider store={store}>
        <App />
    </Provider>
)
```

## Getting Redux State into Components

`react-redux` provides a hook to get state from the Redux store into your components.

`useSelector` accepts a function that accepts the state and likely returns some value from that state.

If our state was keeping track of wins and losses, we could get those values with two `useSelector` hooks.

```js
import { useSelector } from 'react-redux';

const YourPersonalRecord = () => {
    const wins = useSelector(state => state.wins);
    const losses = useSelector(state => state.losses);

    return (
        <p>You have a record of ${wins}-${losses}!</p>
    )
}
```

## Updating Redux State from Components

`react-redux` provides a hook to get the dispatch function from the Redux store into your components.

`useDispatch` returns a dispatch function with you can then use to send actions to the store.

```js
import { useDispatch } from 'react-redux';

const WIN = "WIN";

const YouWin = () => {
    const dispatch = useDispatch();

    const handleAcceptWin = () => {
        dispatch({ type: WIN });
    }

    return (
        <div>
            <p>You win! Click to accept!</p>
            <button onClick={handleAcceptWin}>
                Accept my victory
            </button>
        </div>
    )
}

```

## Wrap up

There was a bit more on using the `bindActionCreators` function, encapsulating logic in custom hooks, etc. But I think the bulk of what we need to know is covered above.

It is actually quite simple, we need to:
- Create actions
- Create reducer(s)
- Create store
- Hook the store up to React with `react-redux`