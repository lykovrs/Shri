import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import Icon from '../Icon';
import { ICONS } from '../../constants';

const styles = {
  main: {
    alignItems: 'center',
    background: '#E9ECEF',
    borderRadius: '16px',
    color: '#000',
    display: 'inline-flex',
    height: '32px',
    overflow: 'hidden',
    verticalAlign: 'middle',
    '&:active': {
      background: 'rgba(0,16,33,0.12)',
      '& *': {
        color: '#000'
      }
    }
  },
  label: {
    lineHeight: '32px',
    fontSize: '15px',
    padding: '0 8px'
  },

  disabled: {
    color: '#858E98'
  },
  closeBtn: {
    background: 'none',
    color: '#AFB4B8',
    paddingRight: '5px'
  },

  avatar: {
    borderRadius: '16px',
    height: '32px',
    width: '32px'
  }
};

class Chips extends Component {
  render() {
    const { classes, img, text } = this.props;
    return (
      <button className={classes.main}>
        {img ? <img className={classes.avatar} src={img} /> : ''}
        <span className={classes.label}>{text}</span>
        <span className={classes.closeBtn}>
          <Icon icon={ICONS.CLOSE} color={'currentColor'} size={24} />
        </span>
      </button>
    );
  }
}

Chips.propTypes = {
  text: PropTypes.string.isRequired,
  img: PropTypes.string
};

export default injectSheet(styles)(Chips);
