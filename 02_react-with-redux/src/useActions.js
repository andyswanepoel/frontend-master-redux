import * as React from "react";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";

export const useActions = actions => {
  const dispatch = useDispatch();
  return React.useMemo(
    () => bindActionCreators(actions, dispatch),
    [actions, dispatch]
  );
};
