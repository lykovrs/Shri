import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

const styles = {
  main: {
    paddingTop: '5px',
    paddingBottom: '5px',
    lineHeight: '17px',
    color: '#000'
  },
  label: {
    fontWeight: 700,
    fontSize: '15px'
  },
  helperText: {
    fontWeight: 400,
    fontSize: '13px'
  },
  disabled: {
    color: '#858E98'
  }
};

class Designator extends Component {
  render() {
    const { classes, text, helperText, disabled } = this.props;
    const wrapperClasses = classNames({
      [classes.main]: true,
      [classes.disabled]: disabled
    });
    return (
      <div className={wrapperClasses}>
        <p className={classes.label}>{text}</p>
        <p className={classes.helperText}>{helperText}</p>
      </div>
    );
  }
}

Designator.propTypes = {
  text: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  disabled: PropTypes.bool
};

export default injectSheet(styles)(Designator);
