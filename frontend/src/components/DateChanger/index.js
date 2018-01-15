import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from '../IconButton';

import injectSheet from 'react-jss';
const styles = {
  main: {
    alignContent: 'stretch',
    alignItems: 'center',
    boxShadow: '0 1px 0 0 #E9ECEF',
    color: '#000',
    display: 'flex',
    fontSize: '15px',
    fontWeight: '600',
    height: '56px',
    justifyContent: 'center',
    padding: '16px'
  },
  now: {
    flex: '1 1 auto',
    textAlign: 'center'
  }
};
class DateChanger extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.main}>
        <IconButton icon={'close'} />
        <span className={classes.now}>14 дек · Сегодня</span>
        <IconButton icon={'close'} />
      </div>
    );
  }
}

DateChanger.propTypes = {};
DateChanger.defaultProps = {};

export default injectSheet(styles)(DateChanger);
