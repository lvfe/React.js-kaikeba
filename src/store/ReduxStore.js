import createStore from "../kreduxx/createStore";
import applyMiddleware from "../kreduxx/applyMiddleware";
import thunk from "redux-thunk";
import logger from "redux-logger";
import combineReducers from "../kreduxx/combineReducer";

function counterReducer(state = 0, action) {
  console.log("Reducer", state, action);
  switch (action.type) {
    case "ADD":
      return state + 1;
    case "MINUS":
      return state - 1;
    default:
      return state;
  }
}
function nameReducer(state = "hello", action) {
  switch (action.type) {
    case "ADD":
      return state + "o";
    default:
      return state;
  }
}
const reducer = combineReducers({
  counter: counterReducer,
  name: nameReducer,
});
const store = createStore(reducer, applyMiddleware(thunk, logger));
export default store;
// function component可以用useState
