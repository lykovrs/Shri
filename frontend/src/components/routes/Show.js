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
 * Роут просмотра/редактирования записи
 */
const ShowRoute = props => {
  return <div>ShowRoute</div>;
};

/**
 * Входные параметры
 * @type {{classes: object}}
 */
ShowRoute.propTypes = {
  classes: PropTypes.object.isRequired
};
export default injectSheet(styles)(ShowRoute);
