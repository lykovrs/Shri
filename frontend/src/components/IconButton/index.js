import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classNames from 'classnames';

/**
 * Стили JSS
 * @type {{main: {alignItems: string, background: string, border: string, borderRadius: string, color: string, cursor: string, display: string, fontSize: number, height: string, justifyContent: string, verticalAlign: string, width: string, "&:active": {background: string, "& *": {color: string}}}, bigSize: {height: string, width: string}}}
 */
const styles = {
  main: {
    alignItems: 'center',
    background: '#E9ECEF',
    border: 'none',
    borderRadius: '24px',
    color: '#AFB4B8',
    cursor: 'pointer',
    display: 'inline-flex',
    fontSize: 0,
    height: '24px',
    justifyContent: 'center',
    verticalAlign: 'middle',
    width: '24px',
    '&:active': {
      background: '#DCDFE1',
      '& *': {
        color: '#000'
      }
    }
  },
  bigSize: {
    height: '32px',
    width: '32px'
  }
};

/**
 * Компонент иконочной кнопки
 * @param props
 * @returns {ReactElement} разметка React
 * @constructor
 */
const IconButton = props => {
  const { classes, children, size, handleClick } = props;
  return (
    <button
      onClick={handleClick}
      className={classNames(classes.main, {
        [classes.bigSize]: size === 'big'
      })}
    >
      {children}
    </button>
  );
};

/**
 * Входные параметры
 * @type {{classes: object, size: string, onClick: function}}
 */
IconButton.propTypes = {
  classes: PropTypes.object.isRequired,
  size: PropTypes.string,
  onClick: PropTypes.func
};

export default injectSheet(styles)(IconButton);
