import { connect } from 'react-redux';
import get from 'lodash/get';
import Auth from './Auth.view';
import {
  requestUserLogin,
  requestUserSignUp,
  requestSocialLogin,
  requestEmailVerification,
  requestEmailValidation,
  resetEmailValidationStatus,
} from './auth.actions';

const mapStateToProps = state => ({
  emailVerificationStatus: state.getIn(['auth', 'emailVerificationStatus']),
  emailVerificationError: state.getIn(['auth', 'emailVerificationError']),
  isAuthenticated: state.getIn(['auth', 'isAuthenticated']),
  emailVerifying: state.getIn(['auth', 'emailVerifying']),
  isLoggingIn: state.getIn(['auth', 'isLoggingIn']),
  error: state.getIn(['auth', 'error']),
  user: state.getIn(['auth', 'user']),
  userSignupSuccess: state.getIn(['auth', 'userSignupSuccess']),
  isValidatingEmailAddress: state.getIn(['auth', 'isValidatingEmailAddress']),
  emailAddressValidated: state.getIn(['auth', 'emailAddressValidated']),
});

const mapDispatchToProps = dispatch => ({
  requestUserLogin: (payload) => {
    dispatch(requestUserLogin(payload));
  },
  requestUserSignUp: (payload) => {
    dispatch(requestUserSignUp(payload));
  },
  requestGoogleLogin: (payload) => {
    dispatch(requestSocialLogin({
      'google-plus-access-token': get(payload, 'user._token.accessToken'),
      data: JSON.stringify(get(payload, 'user'))
    }));
  },
  requestFacebookLogin: (payload) => {
    dispatch(requestSocialLogin({
      'facebook-access-token': get(payload, 'user._token.accessToken'),
      data: JSON.stringify(get(payload, 'user'))
    }));
  },
  requestEmailVerification: (payload) => {
    dispatch(requestEmailVerification(payload));
  },
  requestEmailValidation: (payload) => {
    dispatch(requestEmailValidation(payload));
  },
  resetEmailValidationStatus: () => {
    dispatch(resetEmailValidationStatus());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
