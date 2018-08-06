import { combineReducers } from "redux-immutable";

import home from "./views/home/home.reducer";
import auth from "./views/auth/auth.reducer";

const reducers = combineReducers({
  home,
  auth
});

export default reducers;
