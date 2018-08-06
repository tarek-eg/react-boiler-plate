import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const ProtectedComponent = ({ Component, ...props }) => (
  <Route
    {...props}
    render={() => (
      props.isAuthenticated
        ? <Component {...props} />
        : <Redirect to="/user" />
    )}
  />
);

ProtectedComponent.defaultProps = {
  isAuthenticated: false,
};

ProtectedComponent.propTypes = {
  Component: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.func,
  ]).isRequired,
  isAuthenticated: PropTypes.bool,
};

export default ProtectedComponent;
