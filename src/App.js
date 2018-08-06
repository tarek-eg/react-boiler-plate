import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";

import AppRoutes from "./appRoutes";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fireRedirect: false,
      route: ""
    };
  }

  componentWillMount() {
    const routes = ["/user", "/user/"];
    const { location, isAuthenticated } = this.props;

    if (isAuthenticated || routes.includes(location.pathname)) {
      this.setState({
        fireRedirect: true,
        route: location && location.pathname
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { location } = this.props;
    if (
      nextProps.isAuthenticated &&
      location &&
      (location.pathname === "/user/login" ||
        location.pathname === "/user/signup")
    ) {
      window.location.assign("/");
    }
  }

  render() {
    const { fireRedirect, route } = this.state;

    return [
      <div key={1}>
        {fireRedirect && [
          <div key={1}>{this.setState({ fireRedirect: false })}</div>,
          <Redirect key={2} to={route} />
        ]}
      </div>,
      <div key={2}>
        <ToastContainer />
        <AppRoutes {...this.props} />
      </div>
    ];
  }
}

App.propTypes = {
  location: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.getIn(["auth", "isAuthenticated"])
});

const mapDispatchToProps = () => ({});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
