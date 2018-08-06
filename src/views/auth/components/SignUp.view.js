import React, { Component } from 'react';
import { Grid, Segment, Container, Form, Icon } from 'semantic-ui-react';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import EmailView from './SignUpEmail.view';
import PasswordView from './SignUpPassword.view';
import NameView from './SignUpName.view';
import SocialLoginButton from './SocialLoginButton';
import ResourceStrings from '../../../resources';

import './auth.css';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeView: 'email',
      isPasswordVisible: false,
    };
  }

  componentWillReceiveProps(nextProps){
    if(this.props.emailAddressValidated.trim().toLowerCase() !== 'success' && nextProps.emailAddressValidated.trim().toLowerCase() === 'success'){
      this.setState({activeView: 'password'});
    }
  }

  handleChangeActiveView = view => this.setState({ activeView: view });

  validateEmail = email => {
    const { requestEmailValidation } = this.props;
    requestEmailValidation({email});
  }

  togglePasswordVisibility = () =>
    this.setState(prevState => ({ isPasswordVisible: !prevState.isPasswordVisible }));

  render() {
    const { signup } = ResourceStrings;
    const { styles } = SignUp;
    const {
      requestUserSignUp,
      isLoggingIn,
      facebookLoginHandler,
      googleLoginHandler,
      userSignupSuccess,
      isValidatingEmailAddress,
      emailAddressValidated,
      resetEmailValidationStatus,
    } = this.props;

    return (
      <div>
        <Segment
          stacked
          style={{
            padding: '0px',
            margin: '0px auto',
            maxWidth: 324,
          }}
        >
          <Container
            className="form-wrapper"
            style={{
              padding: '0px 32px',
              backgroundColor: '#FFFFFF',
              margin: '24px 0'
            }}
          >
            <Formik
              initialValues={{
                email: '',
                password: '',
                first: '',
                last: '',
              }}
              validate={(values) => {
                const errors = {};
                if (!values.email) {
                  errors.email = 'Required';
                  resetEmailValidationStatus();
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
                ) {
                  errors.email = 'Invalid email address';
                }
                if (!values.password) {
                  errors.password = 'Password is a required field';
                } else if(values.password.length < 6){
                  errors.password='Password must be at least 6 characters';
                }
                if (!values.first) {
                  errors.first = 'First name is a required field';
                }
                if (!values.last) {
                  errors.last = 'Last name is a required field';
                }
                return errors;
              }}
              onSubmit={(values) => {
                requestUserSignUp(values);
              }}
              render={(
                {
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                }) =>
                (
                  <Form size="large" onSubmit={handleSubmit} className="signup-form">
                    {this.state.activeView === 'email' && (
                      <EmailView
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        validateEmail={this.validateEmail}
                        isValidatingEmailAddress={isValidatingEmailAddress}
                        emailAddressValidated={emailAddressValidated}
                      />
                    )}
                    {this.state.activeView === 'password' && (
                      <PasswordView
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        isPasswordVisible={this.state.isPasswordVisible}
                        togglePasswordVisibility={this.togglePasswordVisibility}
                        handleChangeActiveView={this.handleChangeActiveView}
                      />
                    )}
                    {this.state.activeView === 'getstarted' && (
                      <NameView
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        isLoggingIn={isLoggingIn}
                        userSignupSuccess={userSignupSuccess}
                      />
                    )}
                  </Form>
                )}
            />
            <p className="login-social-label">
              {signup.orCanLogin}
            </p>
            <Grid stackable container columns={2} className="social-login-wrapper">
              <Grid.Column textAlign="center" style={{ padding: '1rem 4px' }}>
                <SocialLoginButton
                  basic
                  fluid
                  size="large"
                  color="blue"
                  style={styles.socialLoginButton}
                  provider='facebook'
                  appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                  onLoginSuccess={(user) => { facebookLoginHandler({user}); }}
                  onLoginFailure={() => { }}
                >
                  <Icon name="facebook f" /><span>{signup.facebook}</span>
                </SocialLoginButton>
              </Grid.Column>

              <Grid.Column textAlign="center" style={{ padding: '1rem 4px' }}>
                <SocialLoginButton
                  basic
                  fluid
                  size="large"
                  color="red"
                  style={styles.socialLoginButton}
                  provider='google'
                  appId={process.env.REACT_APP_GOOGLE_APP_ID}
                  onLoginSuccess={(user) => { googleLoginHandler({user}); }}
                  onLoginFailure={() => { }}
                >
                  <Icon size="large" className="ico--google" /><span>{signup.google}</span>
                </SocialLoginButton>
              </Grid.Column>
            </Grid>

          </Container>
        </Segment>
        <p className="login-social-label">
          {signup.alreadyHaveAccout}
          <Link
            to="/user/login"
            href="/user/login"
            style={{
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            {signup.login}
          </Link>
        </p>
        {this.state.activeView === 'password' &&
        <p className="login-social-label">
          {signup.termsAndConditions}
        </p>
        }
      </div>
    );
  }
}

SignUp.styles={
  socialLoginButton: {
    width: '122px',
    height: '40px',
    fontSize: '14px',
    padding: '0',
    borderRadius: '6px'
  },
  userSignupSuccess: false,
};

SignUp.propTypes = {
  requestUserSignUp: PropTypes.func.isRequired,
  isLoggingIn: PropTypes.bool.isRequired,
  facebookLoginHandler: PropTypes.func.isRequired,
  googleLoginHandler: PropTypes.func.isRequired,
  userSignupSuccess: PropTypes.bool.isRequired,
  isValidatingEmailAddress: PropTypes.bool.isRequired,
  emailAddressValidated: PropTypes.string.isRequired,
  resetEmailValidationStatus: PropTypes.func.isRequired,
  requestEmailValidation: PropTypes.func.isRequired,
};

export default SignUp;
