import { combineReducers } from "redux";
import catchOn from "./popularity";
import catchPotato from "./potatoes";

const rootReducer = combineReducers({
  catchOn, catchPotato,
});

export default rootReducer;
