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
        <div className="theadRow">{this.getHeadRow()}</div>
        <div className="headerRow">{this.getTitleRow('Заголовок')}</div>
        <div className="dataRow">
          {this.getDataRow()}
          {this.getDataRow()}
          {this.getDataRow()}
        </div>

        {tbody}
      </div>
    );
  }

  componentDidMount() {
    // Запрашиваем данный о переговорках
    this.props.loadRoomsData();
  }

  getHeadRow = () => {
    const items = [<div className="theadRow__title" />];
    for (let i = 8; i < 24; i++) {
      items.push(<div>{i}</div>);
    }

    return items;
  };

  getTitleRow = text => {
    const items = [<div className="headerRow__title">{text}</div>];
    for (let i = 8; i < 24; i++) {
      items.push(<div />);
    }
    return items;
  };

  getDataRow = () => {
    const items = [
      <div className="dataRow__title">
        <RowHeader text={'Ржавый Фред'} helperText={'3—6 человек'} />
      </div>
    ];
    for (let i = 8; i < 25; i++) {
      items.push(<Slot />);
    }

    return items;
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
