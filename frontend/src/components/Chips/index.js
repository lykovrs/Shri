import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import Icon from '../Icon';
import { ICONS } from '../../constants';
import Gravatar from 'react-gravatar';

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
      background: '#DCDFE1',
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
    borderRadius: '16px'
  }
};

const Chips = props => {
  const { classes, email, name } = props;
  return (
    <button className={classes.main}>
      {email ? (
        <Gravatar size={32} email={email} className={classes.avatar} />
      ) : (
        ''
      )}
      <span className={classes.label}>{name}</span>
      <span className={classes.closeBtn}>
        <Icon icon={ICONS.CLOSE} color={'currentColor'} size={24} />
      </span>
    </button>
  );
};

Chips.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string
};

export default injectSheet(styles)(Chips);
