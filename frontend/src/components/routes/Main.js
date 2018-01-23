import React from 'react';
import PropTypes from 'prop-types';
import DateChanger from '../DateChanger';
import Schedule from '../Schedule';
import injectSheet from 'react-jss';

/**
 * Стили JSS
 * @type {{main: {}}}
 */
const styles = {
  main: {}
};

/**
 * Стартовый роут-компонент
 */
const MainRoute = props => {
  const { classes } = props;
  return (
    <div className={classes.main}>
      <DateChanger />
      <Schedule />
    </div>
  );
};

/**
 * Входные параметры
 * @type {{classes: object}}
 */
MainRoute.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectSheet(styles)(MainRoute);
