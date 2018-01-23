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
 * Роут редактирования записи
 */
const CreateRoute = props => {
  return <div>CreateRoute</div>;
};

/**
 * Входные параметры
 * @type {{classes: object}}
 */
CreateRoute.propTypes = {
  classes: PropTypes.object.isRequired
};
export default injectSheet(styles)(CreateRoute);
