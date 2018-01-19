import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

const styles = {
  main: {
    lineHeight: '17px',
    color: '#000'
  },
  label: {
    fontWeight: 700,
    fontSize: '15px'
  },
  helperText: {
    fontWeight: 400,
    fontSize: '13px'
  },
  disabled: {
    color: '#858E98'
  }
};

const RowHeader = props => {
  const { classes, text, helperText, disabled } = props;
  const wrapperClasses = classNames({
    [classes.main]: true,
    [classes.disabled]: disabled
  });
  return (
    <div className={wrapperClasses}>
      <p className={classes.label}>{text}</p>
      <p className={classes.helperText}>{helperText}</p>
    </div>
  );
};

RowHeader.propTypes = {
  text: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  disabled: PropTypes.bool
};

export default injectSheet(styles)(RowHeader);
