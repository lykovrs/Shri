import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classNames from 'classnames';

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
    '&:active': {
      background: '#E9ECEF'
    }
  }
};
const Button = props => {
  const { classes, disabled, text, primary } = props;
  const wrapperClasses = classNames({
    [classes.main]: true,
    [classes.disabled]: disabled,
    [classes.primary]: primary
  });
  return <button className={wrapperClasses}>{text}</button>;
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  primary: PropTypes.bool
};

export default injectSheet(styles)(Button);
