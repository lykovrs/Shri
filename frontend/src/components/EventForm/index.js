import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import classNames from 'classnames';
import { Form, Field } from 'react-final-form';
import Button from '../Button';

import {
  currentDateSelector,
  loadedSelector,
  loadingSelector,
  changeDate
} from '../../ducks/rooms';

/**
 * Стили JSS
 * @type {}
 */
const styles = {
  main: {
    padding: '16px'
  },
  header: {
    fontSize: '20px'
  },
  label: {
    fontSize: '13px',
    fontWeight: '600',
    display: 'block'
  },

  control: {
    paddingTop: '16px',
    '& input, & select': {
      border: '2px solid #E9ECEF',
      background: '#FFFFFF',
      borderRadius: '4px',
      fontSize: '15px',
      lineHeight: '17px',
      padding: '0 10px',
      height: '44px',
      width: '100%',

      '&:focus': {
        borderColor: '#007DFF'
      }
    }
  },

  input: {
    background: '#FFFFFF',
    border: '2px solid #E9ECEF',
    borderRadius: '4px'
  },

  dateControl: {},
  timePeriod: {
    display: 'flex',
    paddingTop: '8px',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& input': {},
    '& span': {
      fontSize: '13px',
      padding: '4px',
      fontWeight: 600
    }
  }
};

/**
 * Компонент создания/редактирования события
 * @extends Component
 */
class EventForm extends Component {
  state = {};

  /**
   * render
   * @return {ReactElement} разметка React
   */
  render() {
    const { classes } = this.props;
    const dateControlClasses = classNames({
      [classes.control]: true,
      [classes.dateControl]: true
    });
    return (
      <div className={classes.main}>
        <h2>Новая встреча</h2>
        <Form
          onSubmit={this.onSubmit}
          initialValues={{ employed: true, stooge: 'larry' }}
          render={({ handleSubmit, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
              <div className={classes.control}>
                <label className={classes.label}>Тема</label>
                <Field
                  name="theme"
                  component="input"
                  type="text"
                  placeholder="О чём будете говорить?"
                />
              </div>

              <div className={dateControlClasses}>
                <div className={''}>
                  <label className={classes.label}>Дата и время</label>
                  <Field
                    name="date"
                    component="input"
                    type="text"
                    placeholder="Дата"
                  />
                </div>

                <div className={classes.timePeriod}>
                  <Field
                    name="start"
                    component="input"
                    type="number"
                    placeholder=""
                  />
                  <span>—</span>
                  <Field
                    name="end"
                    component="input"
                    type="number"
                    placeholder=""
                  />
                </div>
              </div>

              <div className={classes.control}>
                <label className={classes.label}>Участники</label>
                <Field name="participant" component="select">
                  <option />
                  <option value="#ff0000">❤️ Red</option>
                  <option value="#00ff00">💚 Green</option>
                  <option value="#0000ff">💙 Blue</option>
                </Field>
              </div>

              <div className="buttons">
                <Button
                  type="submit"
                  text={'Создать встречу'}
                  disabled={submitting || pristine}
                />
              </div>
              <pre>{JSON.stringify(values, 0, 2)}</pre>
            </form>
          )}
        />
      </div>
    );
  }

  sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  onSubmit = async values => {
    await this.sleep(300);
  };
}

/**
 * Входные параметры
 * @type {{classes: object, loading: boolean, loaded: boolean, currentDate: Date}}
 */
EventForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  state => ({
    loading: loadingSelector(state),
    loaded: loadedSelector(state),
    currentDate: currentDateSelector(state)
  }),
  { changeDate }
)(injectSheet(styles)(EventForm));
