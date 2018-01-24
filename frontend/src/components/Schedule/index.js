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
import { eventsSelector, loadEventsData } from '../../ducks/events';
import RowHeader from '../RowHeader';
import Slot from '../Slot';
import { DESCKTOP_BREAK } from '../../constants';

/**
 * Стили JSS
 * @type {{main: {background: string, overflow: string, paddingBottom: string}, row: {border: string, height: string}, dataRow: {display: string, gridAutoRows: string, gridColumnGap: string, gridRowGap: string, gridTemplateColumns: string, "& > div": {background: string}}, conversationHeader: {gridColumnStart: string, gridColumnEnd: string, padding: string}, headerRow: {display: string, gridAutoRows: string, gridTemplateColumns: string, background: string, gridColumnGap: string, gridRowGap: string, "& > div": {backgroundColor: string, fontWeight: string, fontSize: string, padding: string, color: string, textTransform: string, lineHeight: string, letterSpacing: string}}, stageRow: {gridColumnStart: string, gridColumnEnd: string}, theadRow: {background: string, boxShadow: string, display: string, fontSize: string, fontWeight: string, gridAutoRows: string, gridColumnGap: string, gridRowGap: string, gridTemplateColumns: string, lineHeight: string, textAlign: string, "& > div": {transform: string}}, stageRowTitle: {gridColumnStart: string, gridColumnEnd: string}}}
 */
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
  conversationHeader: {
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

  stageRow: {
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
  stageRowTitle: {
    gridColumnStart: '1',
    gridColumnEnd: '5'
  }
};

/**
 * Компонент главной таблицы тайминга
 * @extends Component
 */
class Schedule extends Component {
  /**
   * render
   * @return {ReactElement} разметка React
   */
  render() {
    const { classes, rooms, events } = this.props;

    let tbody = [];

    // проходим по Map и создаем тело таблицы
    for (let entry of rooms) {
      // ключ - это номер этажа
      tbody.push(
        <div key={entry[0]} className={classes.headerRow}>
          {this.getStageRow(entry[0])}
        </div>
      );

      // значение - переговорка
      tbody.push(
        <div key={entry[1]} className={classes.dataRow}>
          {entry[1].map((room, key) => this.getConversationTd(room.title, key))}
        </div>
      );
    }

    return (
      <div className={classes.main}>
        <div className={classes.theadRow}>{this.getHeadRow()}</div>
        {tbody}

        {events.map(event => (
          <div key={event.id}>
            {event.title} <br />
            Начало: {event.dateStart} <br /> Конец: {event.dateEnd}
          </div>
        ))}
      </div>
    );
  }

  /**
   *  Метод жц компонента
   */
  componentDidMount() {
    // Запрашиваем данные о переговорках
    this.props.loadRoomsData();
    // Запрашиваеми данные о событиях
    this.props.loadEventsData();
  }

  /**
   * Рендерит шапку таблицы с указателями времни
   * @returns {ReactElement[]}
   */
  getHeadRow = () => {
    const { classes } = this.props;
    const items = [<div key={7} className={classes.stageRowTitle} />];
    for (let i = 8; i < 24; i++) {
      items.push(<div key={i}>{i}</div>);
    }

    return items;
  };

  /**
   * Рендерит указатель этажности
   * @param text
   * @returns {ReactElement[]}
   */
  getStageRow = text => {
    const { classes } = this.props;
    const items = [
      <div key={text} className={classes.stageRow}>
        {text} этаж
      </div>
    ];

    for (let i = 8; i < 24; i++) {
      items.push(<div key={i} />);
    }
    return items;
  };

  /**
   * Рендерит ячейки для строк с данными переговорок
   * @param title
   * @param key
   * @returns {ReactElement[]}
   */
  getConversationTd = (title, key) => {
    const { classes } = this.props;
    const items = [
      <div key={key} className={classes.conversationHeader}>
        <RowHeader text={title} helperText={'3—6 человек'} />
      </div>
    ];
    for (let i = 8; i < 25; i++) {
      items.push(<Slot key={i} />);
    }

    return items;
  };
}

Schedule.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  state => ({
    loading: loadingSelector(state),
    loaded: loadedSelector(state),
    rooms: roomsSelector(state),
    events: eventsSelector(state)
  }),
  { loadRoomsData, loadEventsData }
)(injectSheet(styles)(Schedule));
