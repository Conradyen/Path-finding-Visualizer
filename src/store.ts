import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducer";
import { sequenceAction } from "./middleware/sequenceAction";
import { composeWithDevTools } from "redux-devtools-extension";
// import { customMiddleware } from "./middleware/middleware";
// const initialState = {};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, sequenceAction))
);

export default store;
