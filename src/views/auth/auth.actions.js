export const REQUEST_USER_LOGIN = 'REQUEST_USER_LOGIN';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';
export const REQUEST_USER_SIGNUP = 'REQUEST_USER_SIGNUP';
export const USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS';
export const USER_SIGNUP_FAILURE = 'USER_SIGNUP_FAILURE';
export const REQUEST_SOCIAL_LOGIN = 'REQUEST_SOCIAL_LOGIN';
export const REQUEST_EMAIL_VERIFICATION = 'REQUEST_EMAIL_VERIFICATION';
export const EMAIL_VERIFICATION_SUCCESS = 'EMAIL_VERIFICATION_SUCCESS';
export const EMAIL_VERIFICATION_FAILURE = 'EMAIL_VERIFICATION_FAILURE';
export const REQUEST_EMAIL_VALIDATION = 'REQUEST_EMAIL_VALIDATION';
export const EMAIL_VALIDATION_SUCCESS = 'EMAIL_VALIDATION_SUCCESS';
export const EMAIL_VALIDATION_FAILURE = 'EMAIL_VALIDATION_FAILURE';
export const RESET_EMAIL_VALIDATION_STATUS = 'RESET_EMAIL_VALIDATION_STATUS';

export const requestEmailVerification = (payload) => ({
  type: REQUEST_EMAIL_VERIFICATION,
  payload,
});

export const requestUserSignUp = payload => ({
  type: REQUEST_USER_SIGNUP,
  payload,
});

export const requestUserLogin = payload => ({
  type: REQUEST_USER_LOGIN,
  payload,
});

export const requestSocialLogin = payload => ({
  type: REQUEST_SOCIAL_LOGIN,
  payload,
});

export const requestEmailValidation = payload => ({
  type: REQUEST_EMAIL_VALIDATION,
  payload,
});

export const resetEmailValidationStatus = () => ({
  type: RESET_EMAIL_VALIDATION_STATUS,
});
