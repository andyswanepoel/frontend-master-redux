import {
  createStore,
  compose,
  applyMiddleware,
  bindActionCreators,
  combineReducers
} from "redux";

// With a deeply nested state, each time you change something,
// you will have to ensure the state remains unchanged for the other parts of the object.
// This will likely require a lot of spreading objects
const initialState = {
  users: [
    { id: 1, name: "Andy" },
    { id: 2, name: "Katie" }
  ],
  tasks: [{ title: "Water plants" }, { title: "Take out trash" }]
};

const ADD_USER = "ADD_USER";
const ADD_TASK = "ADD_TASK";

const addUser = name => ({ type: ADD_TASK, payload: name });
const addTask = title => ({ type: ADD_TASK, payload: title });

// Although we only have two things in the state, this is already getting to be a lot of logic
// Can we split this up between multiple reducers?
// const reducer = (state = initialState, action) => {
//   if (action.type === ADD_USER) {
//     return {
//       ...state,
//       users: [...state.users, action.payload]
//     };
//   }
//   if (action.type === ADD_TASK) {
//     return {
//       ...state,
//       tasks: [...state.tasks, action.payload]
//     };
//   }
// };

// Since we have two distinct things we're updating, can we just make them two reducers?

const userReducer = (users = initialState.users, action) => {
  if (action.type === ADD_USER) {
    return [...users, { name: action.payload }];
  }

  return users;
};

const taskReducer = (tasks = initialState.tasks, action) => {
  if (action.type === ADD_TASK) {
    return [...tasks, { title: action.payload }];
  }

  return tasks;
};

// The shape of the object passed to combineReducers must match the initalState, so it knows where to use each reducer
// NOTE: every action flows through ALL reducers, similar to having one large reducer but easier to reason about
const reducer = combineReducers({ users: userReducer, tasks: taskReducer });

const store = createStore(reducer);

console.log("Initial state: ", store.getState());
