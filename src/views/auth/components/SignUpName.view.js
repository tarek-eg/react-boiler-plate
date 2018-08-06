import React from 'react';
import { Grid, Header, Form, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';

const SignUpName =
  ({
     values,
     errors,
     touched,
     handleChange,
     handleBlur,
     isLoggingIn,
     userSignupSuccess,
   }) => {
    const { styles } = SignUpName;
    return (
      <Grid
        textAlign="center"
        verticalAlign="middle"
        style={{ height: '100%' }}
      >
        {
          userSignupSuccess &&
          <Redirect to="/user/email-sent" />
        }
        <Grid.Column style={{ maxWidth: 400 }} textAlign="left">
          <Header
            color="grey"
            textAlign="center"
            className="header3"
            as="h4"
            style={{
              marginBottom: '20px',
              fontFamily: 'Poppins',
              fontWeight: 100,
            }}
          >
            Introduce yourself
          </Header>
          <Form.Input
            fluid
            label={<span className="login-input-labels">First name</span>}
            size="large"
            name="first"
            id="first"
            value={values.first}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.first && touched.first}
            style={styles.inputs}
          />
          <Form.Input
            fluid
            label={<span className="login-input-labels">Last name</span>}
            size="large"
            name="last"
            id="last"
            value={values.last}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.last && touched.last}
            style={styles.inputs}
          />
          <Button
            fluid
            size="big"
            disabled={errors.first || errors.last || isLoggingIn}
            type="submit"
            loading={isLoggingIn}
            style={styles.completeButton}
          >
            Let&apos;s get started
          </Button>
        </Grid.Column>
      </Grid>
    );
};


SignUpName.styles={
  completeButton: {
    maxWidth: '260px',
    height: '40px',
    fontSize: '14px',
    borderRadius: '6px',
    padding: '0'
  },
  inputs: {
    maxWidth: '260px',
    height: '40px'
  },
};

SignUpName.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  isLoggingIn: PropTypes.bool.isRequired,
  values: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
    first: PropTypes.string,
    last: PropTypes.string,
  }),
  errors: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
    first: PropTypes.string,
    last: PropTypes.string,
  }),
  touched: PropTypes.shape({
    email: PropTypes.bool,
    password: PropTypes.bool,
    first: PropTypes.string,
    last: PropTypes.string,
  }),
  userSignupSuccess: PropTypes.bool.isRequired,
};

SignUpName.defaultProps = {
  values: undefined,
  errors: undefined,
  touched: undefined,
};

export default withRouter(SignUpName);

