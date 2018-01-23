import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classNames from 'classnames';

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

const IconButton = props => {
  const { classes, children, size } = props;
  return (
    <button
      className={classNames(classes.main, {
        [classes.bigSize]: size === 'big'
      })}
    >
      {children}
    </button>
  );
};

IconButton.propTypes = {
  size: PropTypes.string
};

export default injectSheet(styles)(IconButton);
