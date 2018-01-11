import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import Icon from '../Icon';
import { ICONS } from '../../constants';

const styles = {
  main: {
    background: '#E9ECEF',
    borderRadius: '24px',
    color: '#AFB4B8',
    '&:active': {
      background: '#DCDFE1',
      '& *': {
        color: '#000'
      }
    }
  }
};

class IconButton extends Component {
  render() {
    const { classes, icon } = this.props;
    return (
      <button className={classes.main}>
        <Icon
          icon={ICONS[icon.toUpperCase()]}
          color={'currentColor'}
          size={24}
        />
      </button>
    );
  }
}

IconButton.propTypes = {
  icon: PropTypes.string.isRequired
};

export default injectSheet(styles)(IconButton);
