import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classNames from 'classnames';

const styles = {
  main: {
    background: '#fff',
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
const Slot = props => {
  const { classes, disabled } = props;
  const wrapperClasses = classNames({
    [classes.main]: true,
    [classes.disabled]: disabled
  });
  return <div className={wrapperClasses} />;
};

Slot.propTypes = {
  disabled: PropTypes.bool
};

export default injectSheet(styles)(Slot);
