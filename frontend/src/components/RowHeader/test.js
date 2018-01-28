import React from 'react';
import ReactDOM from 'react-dom';
import RowHeader from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RowHeader text={'test'} />, div);
});
