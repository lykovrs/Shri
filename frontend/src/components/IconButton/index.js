import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

const styles = {
  main: {
    border: 'none',
    background: '#E9ECEF',
    borderRadius: '24px',
    padding: '5px',
    fontSize: 0,
    color: '#AFB4B8',
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

IconButton.propTypes = {
  icon: PropTypes.string.isRequired
};

export default injectSheet(styles)(IconButton);
