import React from 'react';
import ReactDOM from 'react-dom';
import Chips from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Chips name={'test'} email={'test@test.com'} />, div);
});
