import React from 'react';
import { ConnectedRouter as Router } from 'react-router-redux';
import { Provider } from 'react-redux';
import App from './components/App';
import store from './redux';
import history from './history';

/**
 * Точка входа приложения
 * @param props
 * @returns {ReactElement} разметка React
 * @constructor
 */
const Root = props => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  );
};

export default Root;
