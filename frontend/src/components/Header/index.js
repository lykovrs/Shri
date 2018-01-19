import React from 'react';
import logo from '../../svg/logo.svg';
import injectSheet from 'react-jss';
const styles = {
  main: {
    alignItems: 'center',
    border: 'none',
    boxShadow: '0 1px 0 0 #E9ECEF',
    display: 'flex',
    height: '48px',
    padding: '0 20px'
  },
  logo: {}
};

const Header = props => {
  const { classes } = props;
  return (
    <header className={classes.main}>
      <img className={classes.logo} src={logo} alt="yandex logo" />
    </header>
  );
};

export default injectSheet(styles)(Header);
