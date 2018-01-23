import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

/**
 * Стили JSS
 * @type {{main: {borderRadius: string, boxShadow: string, color: string, display: string, lineHeight: string, padding: string}, label: {fontSize: string, fontWeight: number}, disabled: {color: string}}}
 */
const styles = {
  main: {
    borderRadius: '4px',
    boxShadow: '0 1px 8px 0 rgba(0,44,92,0.28)',
    color: '#262626',
    display: 'inline-block',
    lineHeight: '24px',
    padding: '0 8px'
  },
  label: {
    fontSize: '11px',
    fontWeight: 700
  },

  disabled: {
    color: '#858E98'
  }
};

/**
 * Компонент тултип-подсказка
 */
const RowHint = props => {
  const { classes, text, disabled } = props;
  const wrapperClasses = classNames({
    [classes.main]: true,
    [classes.disabled]: disabled
  });
  return (
    <div className={wrapperClasses}>
      <p className={classes.label}>{text}</p>
    </div>
  );
};

/**
 * Входные параметры
 * @type {{text: string, disabled: boolean}}
 */
RowHint.propTypes = {
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool
};

export default injectSheet(styles)(RowHint);
