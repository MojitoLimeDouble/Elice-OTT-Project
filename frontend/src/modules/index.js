import { combineReducers } from "redux";
import catchOn from "./popularity";
import catchPotato from "./potatoes";
import inform from "./mypage";

const rootReducer = combineReducers({
  catchOn,
  catchPotato,
  inform,
});

export default rootReducer;
