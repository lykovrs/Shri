import React from 'react';
import ReactDOM from 'react-dom';
import RowHint from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RowHint text={'test'} />, div);
});
