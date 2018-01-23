import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

const styles = {
  main: {
    color: '#000',
    cursor: 'pointer',
    lineHeight: '15px',
    '&:hover': {
      color: '#0070E0'
    },
    '&:active': {
      color: '#1D54FE'
    }
  },

  label: {
    fontSize: '15px',
    fontWeight: 700
  },
  helperText: {
    color: '#000',
    fontSize: '13px',
    fontWeight: 400
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
