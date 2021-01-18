import { combineReducers } from "redux";
import authReducer from "./authReducer";
import currTabReducer from "./currTabReducer";
import errorReducer from "./errorReducer";
import todoReducer from "./todoReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  todos: todoReducer,
  currTab: currTabReducer
});
