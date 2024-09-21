import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { set } from "./actions";

export const SetCounter = () => {
  const countFromStore = useSelector(state => state.count);
  const dispatch = useDispatch();

  const [count, setCount] = React.useState(countFromStore);

  React.useEffect(() => {
    setCount(countFromStore);
  }, [countFromStore]);

  const handleChange = event => {
    setCount(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(set(count));
  };
  return (
    <section className="controls">
      <form onSubmit={handleSubmit}>
        <label htmlFor="set-to">Set Count</label>
        <input
          id="set-to"
          type="number"
          value={count}
          onChange={handleChange}
        />
        <input type="submit" onClick={handleSubmit} />
      </form>
    </section>
  );
};
