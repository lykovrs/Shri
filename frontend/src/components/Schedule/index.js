import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'react-day-picker/lib/style.css';
import 'moment/locale/ru';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import {
  loadedSelector,
  loadingSelector,
  roomsSelector,
  loadRoomsData
} from '../../ducks/rooms';

const styles = {
  main: {
    background: '#ffc'
  }
};

class Schedule extends Component {
  render() {
    const { classes } = this.props;
    return <div className={classes.main}>schedule</div>;
  }

  componentDidMount() {
    this.props.loadRoomsData();
  }
}

Schedule.propTypes = {};
Schedule.defaultProps = {};

export default connect(
  state => ({
    loading: loadingSelector(state),
    loaded: loadedSelector(state),
    rooms: roomsSelector(state)
  }),
  { loadRoomsData }
)(injectSheet(styles)(Schedule));
