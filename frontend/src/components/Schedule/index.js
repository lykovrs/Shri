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
    overflow: 'auto'
  },

  row: {
    border: '1px solid',
    height: '58px'
  }
};

class Schedule extends Component {
  render() {
    const { classes, rooms } = this.props;

    let tbody = [];

    // проходим по Map и создаем тело таблицы
    for (let entry of rooms) {
      // ключ - это номер этажа
      tbody.push(
        <div key={entry[0]} className="headerRow">
          {this.getTitleRow(entry[0])}
        </div>
      );

      // значение - переговорка
      tbody.push(
        <div key={entry[1]} className="dataRow">
          {entry[1].map((room, key) => this.getDataRow(room.title, key))}
        </div>
      );
    }

    return (
      <div className={classes.main}>
        <div className="theadRow">{this.getHeadRow()}</div>
        {tbody}
      </div>
    );
  }

  componentDidMount() {
    // Запрашиваем данный о переговорках
    this.props.loadRoomsData();
  }

  getHeadRow = () => {
    const items = [<div key={7} className="theadRow__title" />];
    for (let i = 8; i < 24; i++) {
      items.push(<div key={i}>{i}</div>);
    }

    return items;
  };

  getTitleRow = text => {
    const items = [
      <div key={text} className="headerRow__title">
        {text}
      </div>
    ];
    for (let i = 8; i < 24; i++) {
      items.push(<div key={i} />);
    }
    return items;
  };

  getDataRow = (title, key) => {
    const items = [
      <div key={key} className="dataRow__title">
        <RowHeader text={title} helperText={'3—6 человек'} />
      </div>
    ];
    for (let i = 8; i < 25; i++) {
      items.push(<Slot key={i} />);
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
