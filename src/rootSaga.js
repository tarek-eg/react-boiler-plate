import { all } from "redux-saga/effects";

import { userLoginSaga, userSignUpSaga } from "./views/auth/auth.saga";

export default function* rootSaga() {
  yield all([userLoginSaga(), userSignUpSaga()]);
}
