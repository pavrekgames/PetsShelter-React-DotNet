import { combineReducers } from "redux";
import userReducer from "./../Features/userSlice";
import tokenReducer from "./../Features/tokenSlice";
import isLoggedInReducer from "./../Features/isLoggedInSlice";
import messagesCountReducer from "./../Features/messagesCountSlice"

const rootReducer = combineReducers({
  user: userReducer,
  token: tokenReducer,
  isLoggedIn: isLoggedInReducer,
  messagesCount: messagesCountReducer
});

export default rootReducer;
