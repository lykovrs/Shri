import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MainRoute from '../routes/Main';
import WriteRoute from '../routes/Write';
import CreateRoute from '../routes/Create';
import PropTypes from 'prop-types';
import Header from '../Header';
import injectSheet from 'react-jss';

/**
 * Стили JSS
 * @type {{wrapper: {position: string, height: string, overflow: string}}}
 */
const styles = {
  wrapper: {
    position: 'relative',
    height: '100vh',
    overflow: 'hidden'
  }
};

/**
 * Компонент обвязки с роутингом
 * @param props
 * @returns {ReactElement} разметка React
 * @constructor
 */
const App = props => {
  const { classes } = props;
  return (
    <div className={classes.wrapper}>
      <Header />
      <Switch>
        <Route exact path="/" component={MainRoute} />
        <Route path="/write" component={WriteRoute} />
        <Route path="/create" component={CreateRoute} />
      </Switch>
    </div>
  );
};

/**
 * Входные параметры
 * @type {{classes: *}}
 */
App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectSheet(styles)(App);
