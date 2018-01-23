import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import CloseIcon from '../../svg/close.svg';
import Gravatar from 'react-gravatar';
import ReactSVG from 'react-svg';

/**
 * Стили JSS
 * @type {{main: {border: string, cursor: string, padding: number, alignItems: string, background: string, borderRadius: string, color: string, display: string, height: string, overflow: string, verticalAlign: string, "&:active": {background: string, "& *": {color: string}}}, label: {lineHeight: string, fontSize: string, padding: string}, disabled: {color: string}, closeBtn: {background: string, color: string, paddingRight: string}, avatar: {borderRadius: string}, icon: {fontSize: number, padding: string}}}
 */
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

/**
 * Компонент Chips
 * @param props
 * @returns {ReactElement} разметка React
 * @constructor
 */
const Chips = props => {
  const { classes, email, name } = props;
  return (
    <button className={classes.main}>
      <Gravatar size={32} email={email} className={classes.avatar} />
      <span className={classes.label}>{name}</span>
      <ReactSVG
        path={CloseIcon}
        className={classes.closeBtn}
        evalScript="always"
        wrapperClassName={classes.icon}
      />
    </button>
  );
};

/**
 * Входные параметры
 * @type {{classes: object, email: string, name: string}}
 */
Chips.propTypes = {
  classes: PropTypes.object.isRequired,
  email: PropTypes.string,
  name: PropTypes.string.isRequired
};

export default injectSheet(styles)(Chips);
