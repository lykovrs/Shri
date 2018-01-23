import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classNames from 'classnames';

/**
 * Стили JSS
 * @type {{main: {background: string, cursor: string, height: string, width: string, "&:active": {background: string}}, disabled: {background: string, "&:active": {background: string}}}}
 */
const styles = {
  main: {
    background: '#fff',
    cursor: 'pointer',
    height: '100%',
    width: '100%',
    '&:active': {
      background: '#005CFF'
    }
  },
  disabled: {
    background: '#D5DFE9',
    '&:active': {
      background: '#98A9B9'
    }
  }
};

/**
 * Компонент содержимого ячейки
 * @param props
 * @returns {ReactElement} разметка React
 * @constructor
 */
const Slot = props => {
  const { classes, disabled } = props;
  const wrapperClasses = classNames({
    [classes.main]: true,
    [classes.disabled]: disabled
  });
  return <div className={wrapperClasses} />;
};

/**
 * Входные параметры
 * @type {{classes: object, disabled: boolean}}
 */
Slot.propTypes = {
  classes: PropTypes.object.isRequired,
  disabled: PropTypes.bool
};

export default injectSheet(styles)(Slot);
