import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classNames from 'classnames';

/**
 * Стили JSS
 * @type {{main: {border: string, background: string, borderRadius: string, fontSize: string, fontWeight: number, height: string, lineHeight: string, padding: string, cursor: string, "&:active": {background: string}}, primary: {background: string, color: string, "&:active": {background: string}}, disabled: {background: string, color: string, cursor: string, "&:active": {background: string}}}}
 */
const styles = {
  main: {
    border: 'none',
    background: '#E9ECEF',
    borderRadius: '4px',
    fontSize: '15px',
    fontWeight: 600,
    height: '44px',
    lineHeight: '18px',
    padding: '0 24px',
    cursor: 'pointer',
    '&:active': {
      background: '#DDE0E4'
    }
  },
  primary: {
    background: '#007DFF',
    color: '#fff',
    '&:active': {
      background: '#0059FF'
    }
  },
  disabled: {
    background: '#E9ECEF',
    color: '#B6B6B6',
    cursor: 'default',
    '&:active': {
      background: '#E9ECEF'
    }
  }
};

/**
 * Компонент базовой кнопки
 * @param props
 * @returns {ReactElement} разметка React
 * @constructor
 */
const Button = props => {
  const { classes, disabled, text, primary } = props;
  const wrapperClasses = classNames({
    [classes.main]: true,
    [classes.disabled]: disabled,
    [classes.primary]: primary
  });
  return <button className={wrapperClasses}>{text}</button>;
};

/**
 * Входные параметры
 * @type {{classes: object, disabled: boolean, primary: boolean, text: string}}
 */
Button.propTypes = {
  classes: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  primary: PropTypes.bool,
  text: PropTypes.string.isRequired
};

export default injectSheet(styles)(Button);
