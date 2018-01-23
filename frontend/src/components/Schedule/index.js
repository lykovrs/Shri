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
import { DESCKTOP_BREAK } from '../../constants';

const styles = {
  main: {
    background: 'rgba(19, 100, 205, 0.1)',
    overflow: 'auto',
    paddingBottom: '24px',
    [DESCKTOP_BREAK]: {
      paddingBottom: '16px'
    }
  },

  row: {
    border: '1px solid',
    height: '58px'
  },
  dataRow: {
    display: 'grid',
    gridAutoRows: '58px',
    gridColumnGap: '1px',
    gridRowGap: '2px',
    gridTemplateColumns: 'repeat(20, 58px)',

    '& > div': {
      background: '#ffffff'
    }
  },
  dataRow__title: {
    gridColumnStart: '1',
    gridColumnEnd: '4',
    padding: '16px',
    [DESCKTOP_BREAK]: {
      padding: '16px 24px'
    }
  },
  headerRow: {
    display: 'grid',
    gridAutoRows: '38px',
    gridTemplateColumns: 'repeat(20, 58px)',
    background: 'rgba(19, 100, 205, 0.1)',
    gridColumnGap: '1px',
    gridRowGap: '1px',

    '& > div': {
      backgroundColor: '#e9ecef',
      fontWeight: '600',
      fontSize: '11px',
      padding: '16px 0 0 16px',
      color: '#858e98',
      textTransform: 'uppercase',
      lineHeight: '16px',
      letterSpacing: '0.4px',

      [DESCKTOP_BREAK]: {
        padding: '16px 0 0 24px'
      }
    }
  },

  headerRow__title: {
    gridColumnStart: '1',
    gridColumnEnd: '5'
  },
  theadRow: {
    background: '#ffffff',
    boxShadow: 'inset 0 1px 0 0 #e9ecef',
    display: 'grid',
    fontSize: '11px',
    fontWeight: '600',
    gridAutoRows: '32px',
    gridColumnGap: '1px',
    gridRowGap: '1px',
    gridTemplateColumns: 'repeat(20, 58px)',
    lineHeight: '32px',
    textAlign: 'center',

    '& > div': {
      transform: 'translate(-50%, 0)'
    }
  },
  theadRow__title: {
    gridColumnStart: '1',
    gridColumnEnd: '5'
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
        <div key={entry[0]} className={classes.headerRow}>
          {this.getTitleRow(entry[0])}
        </div>
      );

      // значение - переговорка
      tbody.push(
        <div key={entry[1]} className={classes.dataRow}>
          {entry[1].map((room, key) => this.getDataRow(room.title, key))}
        </div>
      );
    }

    return (
      <div className={classes.main}>
        <div className={classes.theadRow}>{this.getHeadRow()}</div>
        {tbody}
      </div>
    );
  }

  componentDidMount() {
    // Запрашиваем данный о переговорках
    this.props.loadRoomsData();
  }

  getHeadRow = () => {
    const { classes } = this.props;
    const items = [<div key={7} className={classes.theadRow__title} />];
    for (let i = 8; i < 24; i++) {
      items.push(<div key={i}>{i}</div>);
    }

    return items;
  };

  getTitleRow = text => {
    const { classes } = this.props;
    const items = [
      <div key={text} className={classes.headerRow__title}>
        {text} этаж
      </div>
    ];

    for (let i = 8; i < 24; i++) {
      items.push(<div key={i} />);
    }
    return items;
  };

  getDataRow = (title, key) => {
    const { classes } = this.props;
    const items = [
      <div key={key} className={classes.dataRow__title}>
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
