import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import EventForm from '../EventForm';

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
  const eventId = props.match.params.id;
  return <EventForm id={eventId} />;
};

/**
 * Входные параметры
 * @type {{classes: object}}
 */
WriteRoute.propTypes = {
  classes: PropTypes.object.isRequired
};
export default injectSheet(styles)(WriteRoute);
