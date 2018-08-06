import { Map } from 'immutable';
import isEmpty from 'lodash/isEmpty';

import storage from '../../core/storage';
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
  RESET_EMAIL_VALIDATION_STATUS,
} from './auth.actions';
import { FAILURE, SUCCESS } from '../../core/constants';

const initialState = Map({
  isAuthenticated: !isEmpty(storage.get('auth')),
  emailVerificationStatus: '',
  emailVerificationError: '',
  emailVerifying: false,
  isLoggingIn: false,
  user: Map({}),
  error: '',
  userSignupSuccess: false,
  isValidatingEmailAddress: false,
  emailAddressValidated: '',
});

const login = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_SOCIAL_LOGIN:
    case REQUEST_USER_LOGIN:
      return state.set('isLoggingIn', true);

    case USER_LOGIN_SUCCESS:{
     const { user } = action;
     const objToPush = {
       'event': 'dl-push',
       'amp_event': 'login',
       'amp_eventProperties': {
         'login_date': (new Date()).toISOString(),
         'email': user.email,
       }
     };

      window.dataLayer.push(objToPush);
      return state
        .set('auth', action.auth)
        .set('user', action.user)
        .set('isAuthenticated', true)
        .set('isLoggingIn', false);
    }
    case USER_LOGIN_FAILURE:
      return state
        .set('error', action.error)
        .set('isAuthenticated', false)
        .set('isLoggingIn', false);

    case REQUEST_USER_SIGNUP:
      return state.set('isLoggingIn', true);

    case USER_SIGNUP_SUCCESS: {
      return state
        .set('user', action.user)
        .set('isAuthenticated', false)
        .set('isLoggingIn', false)
        .set('userSignupSuccess', true);
    }
    case USER_SIGNUP_FAILURE: {
      return state
        .set('error', action.error)
        .set('isAuthenticated', false)
        .set('isLoggingIn', false);
    }

    case REQUEST_EMAIL_VERIFICATION:
      return state
        .set('emailVerificationStatus', '')
        .set('emailVerificationError', '')
        .set('emailVerifying', true);

    case EMAIL_VERIFICATION_SUCCESS: {
      const { user } = action.user.data.success;
      const splitName = user.fullName.split(' ');
      const objToPush = {
        'event': 'dl-push',
        'amp_event': 'signup',
        'amp_eventProperties': {
          'email': user.email,
          'first_name' : splitName[0] ,
          'last_name'  : splitName[1] ,
          'signup_date' : (new Date()).toISOString(),
        }
      };
      window.dataLayer.push(objToPush);

      return state
        .set('user', action.user)
        .set('isAuthenticated', true)
        .set('emailVerificationStatus', SUCCESS)
        .set('emailVerificationError', '')
        .set('emailVerifying', false);
    }

    case EMAIL_VERIFICATION_FAILURE:
      return state
        .set('emailVerificationStatus', FAILURE)
        .set('emailVerificationError', action.error)
        .set('emailVerifying', false);

    case REQUEST_EMAIL_VALIDATION:
      return state
        .set('isValidatingEmailAddress', true)
        .set('emailAddressValidated', '');

    case EMAIL_VALIDATION_SUCCESS:
      return state
        .set('isValidatingEmailAddress', false)
        .set('emailAddressValidated', 'success');

    case EMAIL_VALIDATION_FAILURE:
      return state
        .set('isValidatingEmailAddress', false)
        .set('emailAddressValidated', 'failure');

    case RESET_EMAIL_VALIDATION_STATUS:
      return state.set('emailAddressValidated', '');


    default:
      return state;
  }
};

export default login;
