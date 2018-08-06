import React, { Component } from "react";
import { Button, Form, Header, Segment, Icon } from "semantic-ui-react";
import { withFormik } from "formik";
import Yup from "yup";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ResourceStrings from "../../../resources";
import SocialLoginButton from "./SocialLoginButton";
import "./auth.css";

const { login } = ResourceStrings;

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      passwordVisible: false
    };
  }

  handlePasswordVisibility = () => {
    this.setState({ passwordVisible: !this.state.passwordVisible });
  };

  render() {
    const {
      values,
      touched,
      errors,
      handleChange,
      handleBlur,
      handleSubmit,
      isLoggingIn,
      facebookLoginHandler,
      googleLoginHandler
    } = this.props;
    const { passwordVisible } = this.state;
    const { styles } = Login;

    return (
      <Segment stacked style={styles.segment} className="loginSegment">
        <div style={{ padding: "32px" }}>
          <Header as="h4" color="grey" textAlign="center">
            {login.loginMYWEBSITE}
          </Header>
          <Form size="large" onSubmit={handleSubmit}>
            <Form.Input
              fluid
              label={<span className="login-input-labels">Email</span>}
              size="medium"
              error={errors.email && touched.email}
              name="email"
              id="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              icon={
                touched.email &&
                !errors.email && (
                  <Icon className="ico--check" color="teal" size="large" />
                )
              }
              style={styles.inputs}
            />

            <Form.Input
              fluid
              label={<span className="login-input-labels">Password</span>}
              size="medium"
              error={errors.password && touched.password}
              value={values.password}
              type={passwordVisible ? "text" : "password"}
              name="password"
              id="password"
              onChange={handleChange}
              onBlur={handleBlur}
              icon={
                <Icon
                  className={passwordVisible ? "ico--eye" : "ico--eye-closed"}
                  link
                  onClick={this.handlePasswordVisibility}
                  size="large"
                />
              }
              style={styles.inputs}
            />

            <Button
              type="submit"
              fluid
              color="teal"
              size="medium"
              style={styles.loginButton}
              loading={isLoggingIn}
              disabled={isLoggingIn}
            >
              {login.login}
            </Button>
          </Form>

          <p className="login-social-label">{login.orCanLoginWith}</p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap"
            }}
          >
            <SocialLoginButton
              basic
              fluid
              size="medium"
              color="blue"
              provider="facebook"
              appId={process.env.REACT_APP_FACEBOOK_APP_ID}
              onLoginSuccess={user => {
                facebookLoginHandler({ user });
              }}
              onLoginFailure={() => {}}
              style={styles.socialLoginButton}
            >
              <Icon name="facebook f" />
              <span>{login.facebook}</span>
            </SocialLoginButton>
            {/* <Button basic fluid size="medium" color="blue">{login.facebook}</Button> */}
            <SocialLoginButton
              basic
              fluid
              size="medium"
              color="red"
              provider="google"
              appId={process.env.REACT_APP_GOOGLE_APP_ID}
              onLoginSuccess={user => {
                googleLoginHandler({ user });
              }}
              onLoginFailure={() => {}}
              style={styles.socialLoginButton}
            >
              <Icon size="large" className="ico--google" />
              <span>{login.google}</span>
            </SocialLoginButton>
            {/* <Button basic fluid size="medium" color="red">{login.google}</Button> */}
          </div>
          <p className="forgot-pass-label">{login.forgotPassword}</p>
        </div>

        <div
          className="dont-have-account"
          style={{
            backgroundColor: "#DFE4E5",
            padding: "32px"
          }}
        >
          <p className="login-social-label">{login.dontHaveAccount}</p>
          <Button style={styles.loginButton} fluid size="medium" color="teal">
            <Link
              style={{ color: "white" }}
              href="/user/signup"
              to="/user/signup"
            >
              {login.createFreeAccount}
            </Link>
          </Button>
        </div>
      </Segment>
    );
  }
}

Login.styles = {
  segment: {
    padding: "0px",
    maxWidth: 324,
    margin: "0 auto"
  },
  forgotPasswordHeader: {
    textDecoration: "underline",
    cursor: "pointer"
  },
  inputs: {
    maxWidth: "260px",
    height: "40px"
  },
  loginButton: {
    maxWidth: "260px",
    height: "40px",
    fontSize: "14px"
  },
  socialLoginButton: {
    width: "122px",
    height: "40px",
    fontSize: "14px",
    padding: "0"
  }
};

Login.propTypes = {
  isLoggingIn: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  values: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string
  }),
  errors: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string
  }),
  touched: PropTypes.shape({
    email: PropTypes.bool,
    password: PropTypes.bool
  }),
  facebookLoginHandler: PropTypes.func.isRequired,
  googleLoginHandler: PropTypes.func.isRequired
};

Login.defaultProps = {
  values: null,
  errors: null,
  touched: null
};

export default withFormik({
  mapPropsToValues: () => ({}),
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email(login.invalidEmail)
      .required(login.emailRequired),
    password: Yup.string().required(login.passwordRequired)
  }),
  handleSubmit: (values, { props }) => {
    props.requestUserLogin(values);
  },
  displayName: "LoginForm"
})(Login);
