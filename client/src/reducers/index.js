// Importing Required Files And Packages Here.
import { combineReducers } from "redux";

import alert from "./alert";
import auth from "./auth";

export default combineReducers({
  alert,
  auth,
});
