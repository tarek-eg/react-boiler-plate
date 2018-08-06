import React from 'react';
import { Header, Form, Icon, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const Password = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  isPasswordVisible,
  togglePasswordVisibility,
  handleChangeActiveView,
}) => {
  const { styles } = Password;
  return(
    <div>
      <Header
        color="grey"
        textAlign="center"
        className="header3"
        as="h4"
        style={{
          marginBottom: '16px',
          fontFamily: 'Poppins',
          fontWeight: 100,
        }}
      >
        Choose a password
      </Header>
      <Form.Input
        fluid
        label={<span className="login-input-labels">Password</span>}
        type={isPasswordVisible ? 'text' : 'password'}
        error={errors.password && touched.password}
        name="password"
        id="password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        icon={<Icon
          className={isPasswordVisible ? 'ico--eye' : 'ico--eye-closed'}
          link
          size="large"
          onClick={togglePasswordVisibility}
        />}
        style={styles.inputs}
      />
      {(errors.password && touched.password) &&
        <p style={{color: 'red', marginTop: '-16px'}} className="login-input-labels">
          {errors.password}
        </p>
      }
      <Button
        fluid
        size="big"
        disabled={errors.password}
        style={styles.signUpButton}
        onClick={() => handleChangeActiveView('getstarted')}
      >
        Sign up
      </Button>
    </div>
  );
};

Password.styles={
  signUpButton: {
    maxWidth: '260px',
    height: '40px',
    fontSize: '14px',
    borderRadius: '6px'
  },
  inputs: {
    maxWidth: '260px',
    height: '40px'
  },
};

Password.propTypes = {
  isPasswordVisible: PropTypes.bool.isRequired,
  togglePasswordVisibility: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleChangeActiveView: PropTypes.func.isRequired,
  values: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
    first:  PropTypes.string,
    last:  PropTypes.string,
  }),
  errors: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
    first:  PropTypes.string,
    last:  PropTypes.string,
  }),
  touched: PropTypes.shape({
    email: PropTypes.bool,
    password: PropTypes.bool,
    first:  PropTypes.string,
    last:  PropTypes.string,
  }),
};

Password.defaultProps = {
  values: undefined,
  errors: undefined,
  touched: undefined,
};

export default Password;
