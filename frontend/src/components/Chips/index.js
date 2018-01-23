import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import CloseIcon from '../../svg/close.svg';
import Gravatar from 'react-gravatar';
import ReactSVG from 'react-svg';

const styles = {
  main: {
    border: 'none',
    cursor: 'pointer',
    padding: 0,
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
  },
  icon: {
    fontSize: 0,
    padding: '5px'
  }
};

const Chips = props => {
  const { classes, email, name } = props;
  return (
    <button className={classes.main}>
      <Gravatar size={32} email={email} className={classes.avatar} />
      <span className={classes.label}>{name}</span>
      <ReactSVG
        path={CloseIcon}
        callback={svg => console.log(svg)}
        className={classes.closeBtn}
        evalScript="always"
        wrapperClassName={classes.icon}
      />
    </button>
  );
};

Chips.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string
};

export default injectSheet(styles)(Chips);
