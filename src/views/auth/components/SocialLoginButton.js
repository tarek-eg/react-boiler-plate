import React from 'react';
import PropTypes from 'prop-types';
import SocialLogin from 'react-social-login';
import { Button } from 'semantic-ui-react';

class SocialLoginButton extends React.Component {
  render() {
    const { children, triggerLogin, ...props } = this.props;
    return (
      <Button onClick={triggerLogin} {...props}>
        {children}
      </Button>
    );
  }
}

SocialLoginButton.propTypes = {
  children: PropTypes.any.isRequired,
  triggerLogin: PropTypes.func.isRequired,
};

export default SocialLogin(SocialLoginButton);