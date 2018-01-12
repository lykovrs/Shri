import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

const styles = {
  main: {
    padding: '0 8px',
    lineHeight: '24px',
    color: '#262626',
    borderRadius: '4px',
    boxShadow: '0 1px 8px 0 rgba(0,44,92,0.28)',
    display: 'inline-block'
  },
  label: {
    fontWeight: 700,
    fontSize: '11px'
  },

  disabled: {
    color: '#858E98'
  }
};

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

RowHint.propTypes = {
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool
};

export default injectSheet(styles)(RowHint);
