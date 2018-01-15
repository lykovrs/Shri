import React from 'react';
import PropTypes from 'prop-types';
import DateChanger from '../DateChanger';
import injectSheet from 'react-jss';

const styles = {
  main: {}
};

const MainRoute = props => {
  const { classes } = props;
  return (
    <div>
      <DateChanger />
      MainRoute
    </div>
  );
};

MainRoute.propTypes = {};
MainRoute.defaultProps = {};

export default injectSheet(styles)(MainRoute);
