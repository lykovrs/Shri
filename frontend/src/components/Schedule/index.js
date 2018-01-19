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
    const theadRow = [
      <div className="theadRow__title" />,
      <div>1</div>,
      <div>2</div>,
      <div>3</div>,
      <div>4</div>,
      <div>5</div>,
      <div>6</div>,
      <div>7</div>,
      <div>8</div>,
      <div>9</div>,
      <div>10</div>,
      <div>11</div>,
      <div>12</div>,
      <div>13</div>,
      <div>14</div>,
      <div>15</div>,
      <div>16</div>,
      <div>17</div>,
      <div>18</div>,
      <div>19</div>,
      <div>20</div>,
      <div>21</div>,
      <div>22</div>,
      <div>23</div>
    ];
    const headerRow = [
      <div className="headerRow__title">Title</div>,
      <div className={classes.rowHeader} />,
      <div className={classes.rowHeader} />,
      <div className={classes.rowHeader} />,
      <div className={classes.rowHeader} />,
      <div className={classes.rowHeader} />,
      <div className={classes.rowHeader} />,
      <div className={classes.rowHeader} />,
      <div className={classes.rowHeader} />,
      <div className={classes.rowHeader} />,
      <div className={classes.rowHeader} />,
      <div className={classes.rowHeader} />,
      <div className={classes.rowHeader} />,
      <div className={classes.rowHeader} />,
      <div className={classes.rowHeader} />,
      <div className={classes.rowHeader} />,
      <div className={classes.rowHeader} />,
      <div className={classes.rowHeader} />,
      <div className={classes.rowHeader} />,
      <div className={classes.rowHeader} />,
      <div className={classes.rowHeader} />,
      <div className={classes.rowHeader} />,
      <div className={classes.rowHeader} />,
      <div className={classes.rowHeader} />
    ];
    const dataRow = [
      <div className="dataRow__title">
        <RowHeader text={'Ржавый Фред'} helperText={'3—6 человек'} />
      </div>,
      <div>1</div>,
      <div>2</div>,
      <div>3</div>,
      <div>4</div>,
      <div>5</div>,
      <div>6</div>,
      <div>7</div>,
      <div>8</div>,
      <div>9</div>,
      <div>10</div>,
      <div>11</div>,
      <div>12</div>,
      <div>13</div>,
      <div>14</div>,
      <div>15</div>,
      <div>16</div>,
      <div>17</div>,
      <div>18</div>,
      <div>19</div>,
      <div>20</div>,
      <div>21</div>,
      <div>22</div>,
      <div>23</div>,
      <div>24</div>
    ];
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
