import React from 'react';
import { Header, Form, Icon, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const Email = ({
  handleChange,
  handleBlur,
  values,
  touched,
  errors,
  validateEmail,
  isValidatingEmailAddress,
  emailAddressValidated,
}) => {
  const { styles } = Email;
  return (
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
          fontSize: '20px'
        }}
      >
        Enter your email
      </Header>
      <Form.Input
        fluid
        label={<span className="login-input-labels">Email</span>}
        error={errors.email && touched.email}
        name="email"
        id="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        icon={touched.email && !errors.email &&
        <Icon
          className="ico--check"
          size="large"
          color="teal"
        />
        }
        style={styles.inputs}
      />
      {
        emailAddressValidated.trim().toLowerCase() === 'failure' && values.email !== '' &&
          <p className="error-message">Email is already taken</p>
      }
      <Button
        disabled={errors.email || values.email === ''}
        fluid
        color="teal"
        size="big"
        style={styles.getStartedButton}
        onClick={() => validateEmail(values.email)}
        loading={isValidatingEmailAddress}
      >
        Get Started
      </Button>
    </div>
  );
};

Email.styles={
  getStartedButton: {
    maxWidth: '260px',
    height: '40px',
    fontSize: '14px',
    borderRadius: '6px',
    padding: '0'
  },
  inputs: {
    maxWidth: '260px',
    height: '40px',
  },
};

Email.propTypes = {
  isValidatingEmailAddress: PropTypes.bool.isRequired,
  emailAddressValidated: PropTypes.string.isRequired,
  validateEmail: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
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

Email.defaultProps = {
  values: undefined,
  errors: undefined,
  touched: undefined,
};

export default Email;
