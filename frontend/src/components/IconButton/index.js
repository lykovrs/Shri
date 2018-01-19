import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

const styles = {
  main: {
    background: '#E9ECEF',
    border: 'none',
    borderRadius: '24px',
    color: '#AFB4B8',
    fontSize: 0,
    padding: '5px',
    '&:active': {
      background: '#DCDFE1',
      '& *': {
        color: '#000'
      }
    }
  }
};

const IconButton = props => {
  const { classes, children } = props;
  return <button className={classes.main}>{children}</button>;
};

IconButton.propTypes = {};

export default injectSheet(styles)(IconButton);
