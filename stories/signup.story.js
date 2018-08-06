import React from 'react';
import { storiesOf } from '@storybook/react';
import Signup from '../src/views/auth/components/SignUp.view';

const handleSubmit = (data) => {
  console.log('data submitted is: ', data);
};

storiesOf('Signup', module)
  .add('Signup example', () => <Signup onSubmit={handleSubmit} />);
