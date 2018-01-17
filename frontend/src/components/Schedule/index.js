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
    // background: "#ffc",
  },
  rowHeader: {
    height: '32px',
    background: '#E9ECEF',
    fontSize: '11px',
    color: '#858E98',
    fontWeight: '600',
    letterSpacing: '0.4px',
    textTransform: 'uppercase',
    padding: '16px 0 0 16px',
    lineHeight: '11px'
  },
  row: {
    border: '1px solid',
    height: '58px'
  }
};

class Schedule extends Component {
  render() {
    const { classes, rooms } = this.props;
    let rows = new Map();
    rooms.forEach(room => {
      if (!rows.get(room.floor)) rows.set(room.floor, []);
      rows.set(room.floor, [...rows.get(room.floor), room]);
    });

    let tbody = [];

    for (let entry of rows) {
      // то же что и recipeMap.entries()
      tbody.push(
        <div className={classes.rowHeader} key={entry}>
          {entry[0]} Этаж
        </div>
      );
      entry[1].forEach(room => {
        tbody.push(
          <div className={classes.row} key={room.title}>
            {room.title}
          </div>
        );
      });
    }
    console.log(tbody);
    return (
      <div className={classes.main}>
        schedule
        {/*{this.getHeader(3)}*/}
        {tbody}
      </div>
    );
  }

  componentDidMount() {
    this.props.loadRoomsData();
  }

  getHeader = floor => {
    return <div>{floor}</div>;
  };
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
