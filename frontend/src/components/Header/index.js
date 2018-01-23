import React from 'react';
import logo from '../../svg/logo.svg';
import injectSheet from 'react-jss';
import Button from '../Button';
import { DESCKTOP_BREAK } from '../../constants';
const styles = {
  main: {
    alignItems: 'center',
    border: 'none',
    boxShadow: '0 1px 0 0 #E9ECEF',
    display: 'flex',
    height: '48px',
    padding: '0 20px',
    [DESCKTOP_BREAK]: {
      height: '70px',
      justifyContent: 'space-between',
      padding: '0 24px'
    }
  },
  create: {
    display: 'none',
    [DESCKTOP_BREAK]: {
      display: 'block'
    }
  },
  logo: {}
};

const Header = props => {
  const { classes } = props;
  return (
    <header className={classes.main}>
      <img className={classes.logo} src={logo} alt="yandex logo" />
      <div className={classes.create}>
        <Button text={'Создать встречу'} primary={true} />
      </div>
    </header>
  );
};

export default injectSheet(styles)(Header);
