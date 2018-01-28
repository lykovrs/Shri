import React from 'react';
import ReactDOM from 'react-dom';
import Slot from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Slot disabled={true} />, div);
});
