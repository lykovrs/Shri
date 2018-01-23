import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

/**
 * Стили JSS
 * @type {{main: {}}}
 */
const styles = {
  main: {}
};

/**
 * Роут просмотра записи
 */
const WriteRoute = props => {
  return <div>WriteRoute</div>;
};

/**
 * Входные параметры
 * @type {{classes: object}}
 */
WriteRoute.propTypes = {
  classes: PropTypes.object.isRequired
};
export default injectSheet(styles)(WriteRoute);
