// import { bindActionCreators } from "redux";
// import { useDispatch, useSelector } from "react-redux";
// import { decrement, increment, set } from "./actions";
import { SetCounter } from "./SetCounter";
// import { useActions } from "./useActions";
import { useCounter } from "./useCounter";

export const Counter = () => {
  const incident = "Incident";

  // you could create actions bound to dispatch
  //   const {
  //     increment: dispatchIncrement,
  //     decrement: dispatchDecrement,
  //     set: dispatchSet
  //   } = bindActionCreators({ increment, decrement, set }, dispatch);

  // or create a custom actions hook
  //   const {
  //     increment: dispatchIncrement,
  //     decrement: dispatchDecrement,
  //     set: dispatchSet
  //   } = useActions({ increment, decrement, set });

  // or create a useCounter hook to encapsulate logic
  const { count, increment, decrement, set } = useCounter();

  return (
    <main className="Counter">
      <h1>Days Since Last {incident}</h1>
      <p className="count">{count}</p>
      <section className="controls">
        <button onClick={increment}>Increment</button>
        <button onClick={() => set(0)}>Reset</button>
        <button onClick={decrement}>Decrement</button>
      </section>
      <SetCounter />
    </main>
  );
};

export default Counter;
