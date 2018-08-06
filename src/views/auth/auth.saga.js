import omit from 'lodash/omit';
import { put, takeEvery, call } from 'redux-saga/effects';

import storage from '../../core/storage/index';
import ResourceStrings from '../../resources';
import api from '../../core/api/index';
import {
  REQUEST_USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  REQUEST_USER_SIGNUP,
  USER_SIGNUP_FAILURE,
  USER_SIGNUP_SUCCESS,
  REQUEST_SOCIAL_LOGIN,
  REQUEST_EMAIL_VERIFICATION,
  EMAIL_VERIFICATION_SUCCESS,
  EMAIL_VERIFICATION_FAILURE,
  REQUEST_EMAIL_VALIDATION,
  EMAIL_VALIDATION_FAILURE,
  EMAIL_VALIDATION_SUCCESS,
} from './auth.actions';

export function* userLoginApi(action) {
  try {
    const response = yield call(api, {
      method: 'POST',
      url: '/v2/api/users/user-login',
      data: action.payload,
    });

    if (response && response.status >= 200 && response.status <= 299) {
      yield put({
        type: USER_LOGIN_SUCCESS,
        user: response.data.success.user,
        auth: { token: response.data.success.token, validUntil: response.data.success.validUntil },
      });
      storage.set('user', response.data.success.user);
      storage.set('auth', { token: response.data.success.token, validUntil: response.data.success.validUntil });
    } else {
      const message = (response && response.data && response.data.error.message) || ResourceStrings.defaultError;
      yield put({
        type: USER_LOGIN_FAILURE,
        error: message,
      });
    }
  } catch (e) {
    throw Error('Something went wrong while executing saga.');
  }
}

export function* userSignUpAPI(action) {
  try {
    const response = yield call(api, {
      method: 'POST',
      url: '/v2/api/users/register-via-email',
      data: omit(Object.assign(action.payload, {}, { fullName: `${action.payload.first} ${action.payload.last}` }), ['first', 'last']),
    });

    if (response && response.status >= 200 && response.status <= 299) {
      yield put({
        type: USER_SIGNUP_SUCCESS,
        user: response.data.success.user,
        auth: { token: response.data.success.token, validUntil: response.data.success.validUntil },
      });
      storage.set('user', response.data.success.user);
      storage.set('auth', { token: response.data.success.token, validUntil: response.data.success.validUntil });
    } else {
      const message = (response && response.data && response.data.error.message) || ResourceStrings.defaultError;
      yield put({
        type: USER_SIGNUP_FAILURE,
        error: message,
      });
    }
  } catch (e) {
    throw Error('Something went wrong while executing saga.');
  }
}

export function* userSocialApi(action) {
  try {
    const response = yield call(api, {
      method: 'POST',
      url: '/v2/api/users/login-with-social',
      data: action.payload,
    });
    if (response && response.status >= 200 && response.status <= 299) {
      yield put({
        type: USER_LOGIN_SUCCESS,
        user: response.data.success.user,
        auth: { token: response.data.success.token, validUntil: response.data.success.validUntil },
      });
      storage.set('user', response.data.success.user);
      storage.set('auth', { token: response.data.success.token, validUntil: response.data.success.validUntil });
    } else {
      const message = (response && response.data && response.data.error.message) || ResourceStrings.defaultError;
      yield put({
        type: USER_LOGIN_FAILURE,
        error: message,
      });
    }
  } catch (e) {
    throw Error('Something went wrong while executing saga.');
  }
}

export function* requestEmailVerify(action) {
  try {
    const user = yield call(api, {
      method: 'PATCH',
      url: `/v2/api/users/account-activation`,
      data: {
        'verification-code': action.payload.verificationToken,
      }
    });

    if (user && user.status >= 200 && user.status <= 299) {
      yield put({
        type: EMAIL_VERIFICATION_SUCCESS,
        user,
      });
      storage.set('user', user);
    } else {
      const message = (user && user.response && user.data.error.message) || ResourceStrings.defaultError;
      yield put({
        type: EMAIL_VERIFICATION_FAILURE,
        error: message,
      });
    }
  } catch (e) {
    throw Error('Something went wrong while executing saga.');
  }
}

export function* requestEmailValidation(action){
  try{
    const resp =  yield call(api, {
      method: 'POST',
      url: '/v2/api/users/validate-email',
      data: {
        email: action.payload.email,
      }
    });

    if(resp && resp.status >= 200 && resp.status <= 299){
      yield put({
        type: EMAIL_VALIDATION_SUCCESS,
        resp
      });
    } else {
      const message = (resp && resp.response && resp.data.error.message) || ResourceStrings.defaultError;
      yield put({
        type: EMAIL_VALIDATION_FAILURE,
        error: message,
      });
    }
  }catch(e){
    throw Error('Something went wrong while executing saga.');
  }
}

export function* emailVerification() {
  yield takeEvery(REQUEST_EMAIL_VERIFICATION, requestEmailVerify);
}
export function* userSignUpSaga() {
  yield takeEvery(REQUEST_USER_SIGNUP, userSignUpAPI);
}

export function* userLoginSaga() {
  yield takeEvery(REQUEST_USER_LOGIN, userLoginApi);
}

export function* socialLoginSaga() {
  yield takeEvery(REQUEST_SOCIAL_LOGIN, userSocialApi);
}

export function* emailValidationSaga() {
  yield takeEvery(REQUEST_EMAIL_VALIDATION, requestEmailValidation);
}
