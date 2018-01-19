import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactSVG from 'react-svg';
import ArrowIcon from '../../svg/arrow.svg';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import MomentLocaleUtils from 'react-day-picker/moment';
import moment from 'moment';
import 'moment/locale/ru';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import {
  currentDateSelector,
  loadedSelector,
  loadingSelector,
  changeDate
} from '../../ducks/rooms';
const styles = {
  main: {
    alignContent: 'stretch',
    alignItems: 'center',
    boxShadow: '0 1px 0 0 #E9ECEF',
    display: 'flex',
    fontSize: 0,
    height: '56px',
    justifyContent: 'center',
    padding: '16px',
    position: 'relative'
  },
  now: {
    color: '#000',
    fontSize: '15px',
    fontWeight: '600',
    flex: '1 1 auto',
    lineHeight: '56px',
    textAlign: 'center'
  },
  calendarWrapper: {
    alignItems: 'center',
    background: '#fff',
    borderRadius: '0 0 8px 8px',
    boxShadow: '0 1px 16px 0 rgba(0,44,92,0.28);',
    display: 'flex',
    height: '380px',
    justifyContent: 'center',
    left: '0',
    padding: '16px',
    position: 'absolute',
    right: '0',
    top: '100%',
    zIndex: 1
  },

  blockLayer: {
    position: 'absolute',
    top: '100%',
    height: '9999px',
    width: '100%',
    background: 'rgba(0, 16, 33, 0.8)'
  },
  rightArrow: {
    transform: 'rotate(180deg)'
  }
};
class DateChanger extends Component {
  state = {
    isOpen: false
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.main}>
        <div onClick={this.changeDay(-1)}>
          <ReactSVG
            path={ArrowIcon}
            callback={svg => console.log(svg)}
            className="example"
            evalScript="always"
          />
        </div>

        <div className={classes.now} onClick={this.toggleOpen}>
          {moment(this.props.currentDate).format('DD MMM')} · Сегодня
        </div>
        <div onClick={this.changeDay(1)}>
          <ReactSVG
            path={ArrowIcon}
            callback={svg => console.log(svg)}
            className={classes.rightArrow}
            evalScript="always"
          />
        </div>
        {this.getCalendar()}
      </div>
    );
  }

  changeDay = sign => ev => {
    ev.preventDefault();
    const currentDate = this.props.currentDate;
    const day = currentDate.getDate();
    const newDate = currentDate.setDate(day + sign);
    this.props.changeDate(new Date(newDate));
  };

  handleDayClick = day => {
    this.props.changeDate(day);
    this.toggleOpen();
  };

  getCalendar = () => {
    const { classes, currentDate } = this.props;
    if (this.state.isOpen) {
      return [
        <div
          key={classes.blockLayer}
          className={classes.blockLayer}
          onClick={this.toggleOpen}
        />,
        <div key={classes.calendarWrapper} className={classes.calendarWrapper}>
          <DayPicker
            localeUtils={MomentLocaleUtils}
            locale={'ru'}
            selectedDays={currentDate}
            onDayClick={this.handleDayClick}
          />
        </div>
      ];
    }
    return null;
  };

  toggleOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
}

DateChanger.propTypes = {};
DateChanger.defaultProps = {};

export default connect(
  state => ({
    loading: loadingSelector(state),
    loaded: loadedSelector(state),
    currentDate: currentDateSelector(state)
  }),
  { changeDate }
)(injectSheet(styles)(DateChanger));
