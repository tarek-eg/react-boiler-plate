import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { Image, Grid } from "semantic-ui-react";

import Login from "./components/Login.view";
import SignUp from "./components/SignUp.view";
import "./auth.css";

class Authentication extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      fireRedirect: false,
      route: ""
    };
  }

  componentWillMount() {
    const { location, isAuthenticated } = this.props;
    if (location) {
      if (isAuthenticated) {
        this.setState({
          fireRedirect: true,
          route: "/events"
        });
      }
      if (location.pathname.match(/user(\/?)$/)) {
        this.setState({
          fireRedirect: true,
          route: "/user/login"
        });
      }
    }
  }

  render() {
    const { fireRedirect, route } = this.state;
    const {
      requestUserLogin,
      requestUserSignUp,
      isLoggingIn,
      userSignupSuccess
    } = this.props;

    return [
      <div key={1}>
        {fireRedirect && [
          <div key={1}>{this.setState({ fireRedirect: false })}</div>,
          <Redirect key={2} to={route} />
        ]}
      </div>,
      <div key={2} id="auth" className="auth-wrapper">
        <Grid container>
          <Grid.Column width={12} style={{ padding: 0 }}>
            <Image
              src=""
              centered
              style={{
                width: 100,
                height: 50,
                marginBottom: 24,
                marginTop: 24
              }}
            />
          </Grid.Column>
          <Grid.Column width={12} style={{ padding: 0 }}>
            <Route
              path="/user/login"
              render={() => {
                return (
                  <Login
                    requestUserLogin={requestUserLogin}
                    isLoggingIn={isLoggingIn}
                  />
                );
              }}
            />
            <Route
              path="/user/signup"
              render={() => {
                return (
                  <SignUp
                    requestUserSignUp={requestUserSignUp}
                    isLoggingIn={isLoggingIn}
                    userSignupSuccess={userSignupSuccess}
                  />
                );
              }}
            />
          </Grid.Column>
        </Grid>
      </div>
    ];
  }
}

Authentication.defaultProps = {
  isLoggingIn: false,
  isAuthenticated: false,
  userSignupSuccess: false
};

Authentication.propTypes = {
  isLoggingIn: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  location: PropTypes.object.isRequired,
  requestUserLogin: PropTypes.func.isRequired,
  requestUserSignUp: PropTypes.func.isRequired,
  userSignupSuccess: PropTypes.bool
};

Authentication.styles = {
  layout: {}
};

export default Authentication;
