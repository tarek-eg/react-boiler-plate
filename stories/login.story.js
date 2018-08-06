import React from 'react';
import { storiesOf } from '@storybook/react';
import Login from '../src/views/auth/components/Login.view';

const handleSubmit = (data) => {
  console.log('data submitted is: ', data);
};

storiesOf('Login', module)
  .add('Login example', () => <Login onSubmit={handleSubmit} />);
