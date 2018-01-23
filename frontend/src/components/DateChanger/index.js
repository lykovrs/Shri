import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactSVG from 'react-svg';
import { DESCKTOP_BREAK } from '../../constants';
import ArrowIcon from '../../svg/arrow.svg';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import IconButton from '../IconButton/index';
import MomentLocaleUtils from 'react-day-picker/moment';
import moment from 'moment';
import 'moment/locale/ru';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import classNames from 'classnames';
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
    position: 'relative',

    [DESCKTOP_BREAK]: {
      margin: '0 8px',
      width: '245px'
    }
  },
  now: {
    cursor: 'pointer',
    color: '#000',
    flex: '1 1 auto',
    fontSize: '15px',
    fontWeight: '600',
    lineHeight: '56px',
    textAlign: 'center',
    '&:hover': {
      color: '#0070E0'
    },
    '&:active': {
      color: '#1D54FE'
    }
  },
  isOpen: {
    color: '#1D54FE'
  },
  calendarWrapper: {
    alignItems: 'center',
    background: '#fff',
    borderRadius: '0 0 8px 8px',
    boxShadow: '0 1px 16px 0 rgba(0,44,92,0.28);',
    display: 'flex',
    fontSize: '15px',
    height: '380px',
    justifyContent: 'center',
    left: '0',
    padding: '16px',
    position: 'absolute',
    right: '0',
    top: '100%',
    zIndex: 1,

    [DESCKTOP_BREAK]: {
      borderRadius: '8px',
      right: 'auto',
      width: '604px'
    }
  },

  blockLayer: {
    background: 'rgba(0, 16, 33, 0.8)',
    height: '9999px',
    position: 'absolute',
    top: '100%',
    width: '100%',

    [DESCKTOP_BREAK]: {
      bottom: '0',
      left: '0',
      opacity: 0,
      position: 'fixed',
      right: '0',
      top: '0'
    }
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
    const nowClasses = classNames({
      [classes.now]: true,
      [classes.isOpen]: this.state.isOpen
    });
    return (
      <div className={classes.main}>
        <IconButton size={'big'} onClick={this.changeDay(-1)}>
          <ReactSVG
            path={ArrowIcon}
            callback={svg => console.log(svg)}
            className="example"
            evalScript="always"
          />
        </IconButton>

        <div className={nowClasses} onClick={this.toggleOpen}>
          {moment(this.props.currentDate).format('DD MMM')} · Сегодня
        </div>
        <IconButton size={'big'} onClick={this.changeDay(1)}>
          <ReactSVG
            path={ArrowIcon}
            callback={svg => console.log(svg)}
            className={classes.rightArrow}
            evalScript="always"
          />
        </IconButton>
        {this.getCalendar()}
      </div>
    );
  }

  changeDay = sign => ev => {
    // ev.preventDefault();
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
