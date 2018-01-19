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
import RowHeader from '../RowHeader';
import Slot from '../Slot';

import './style.css';

const styles = {
  main: {
    // background: "#ffc",
  },
  rowHeader: {},
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

    const theadRow = [<div className="theadRow__title" />];
    for (let i = 8; i < 24; i++) {
      theadRow.push(<div>{i}</div>);
    }

    const headerRow = [<div className="headerRow__title">Title</div>];
    for (let i = 8; i < 24; i++) {
      headerRow.push(<div className={classes.rowHeader} />);
    }

    const dataRow = [
      <div className="dataRow__title">
        <RowHeader text={'Ржавый Фред'} helperText={'3—6 человек'} />
      </div>
    ];
    for (let i = 8; i < 25; i++) {
      dataRow.push(<Slot />);
    }

    return (
      <div className={classes.main}>
        <div className="theadRow">{theadRow}</div>
        <div className="headerRow">{headerRow}</div>
        <div className="dataRow">
          {dataRow}
          {dataRow}
          {dataRow}
        </div>
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
