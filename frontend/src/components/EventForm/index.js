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
import { usersSelector, loadUsersData } from '../../ducks/users';
import { createEvent } from '../../ducks/events';

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
    paddingTop: '16px'
  },

  input: {
    background: '#FFFFFF',
    border: '2px solid #E9ECEF',
    borderRadius: '4px',
    fontSize: '15px',
    lineHeight: '17px',
    padding: '0 10px',
    height: '44px',
    width: '100%',

    '&:focus': {
      borderColor: '#007DFF'
    }
  },

  select: {
    height: '76px'
  },

  dateControl: {},
  timePeriod: {
    display: 'flex',
    paddingTop: '8px',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& input': { width: '120px' },
    '& span': {
      fontSize: '13px',
      padding: '4px',
      fontWeight: 600
    }
  },

  buttonBar: {
    padding: '16px',
    textAlign: 'center'
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
    const { classes, users } = this.props;

    const dateControlClasses = classNames({
      [classes.control]: true,
      [classes.dateControl]: true
    });

    const selectClasses = classNames({
      [classes.select]: true,
      [classes.input]: true
    });
    return (
      <div className={classes.main}>
        <h2>Новая встреча</h2>
        <Form
          onSubmit={this.onSubmit}
          validate={values => {
            const errors = {};
            if (!values.theme) {
              errors.theme = 'Вы забыли указать тему';
            }
            if (!values.date) {
              errors.date = 'Вы забыли указать день';
            }
            if (!values.start) {
              errors.start = 'Вы забыли указать время начала';
            } else if (values.start < 7 || values.start > 23) {
              errors.start = 'Что-то не так со временем';
            }
            if (!values.end) {
              errors.end = 'Вы забыли указать время окончания';
            } else if (values.end < 7 || values.end > 23) {
              errors.end = 'Что-то не так со временем';
            }

            if (!values.users.length) {
              errors.users = 'Вы назначить участника';
            }

            return errors;
          }}
          initialValues={{ users: [] }}
          render={({ handleSubmit, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
              <div className={classes.control}>
                <Field name="theme">
                  {({ input, meta }) => (
                    <div>
                      <label className={classes.label}>Тема</label>
                      <input
                        className={classes.input}
                        {...input}
                        type="text"
                        placeholder="О чём будете говорить?"
                      />
                      {meta.error && meta.touched && <div>{meta.error}</div>}
                    </div>
                  )}
                </Field>
              </div>

              <div className={dateControlClasses}>
                <div className={''}>
                  <Field name="date">
                    {({ input, meta }) => (
                      <div>
                        <label className={classes.label}>Дата и время</label>
                        <input
                          className={classes.input}
                          {...input}
                          type="date"
                          placeholder="О чём будете говорить?"
                        />
                        {meta.error && meta.touched && <div>{meta.error}</div>}
                      </div>
                    )}
                  </Field>
                </div>

                <div className={classes.timePeriod}>
                  <Field name="start">
                    {({ input, meta }) => (
                      <div>
                        <input
                          className={classes.input}
                          {...input}
                          type="time"
                        />
                        {meta.error && meta.touched && <div>{meta.error}</div>}
                      </div>
                    )}
                  </Field>
                  <div>—</div>
                  <Field name="end">
                    {({ input, meta }) => (
                      <div>
                        <input
                          className={classes.input}
                          {...input}
                          type="time"
                        />
                        {meta.error && meta.touched && <div>{meta.error}</div>}
                      </div>
                    )}
                  </Field>
                </div>
              </div>

              <div className={classes.control}>
                <Field name="users">
                  {({ input, meta }) => (
                    <div>
                      <label className={classes.label}>Участники</label>

                      <select
                        className={selectClasses}
                        {...input}
                        multiple={true}
                        size="3"
                      >
                        <option disabled>Выберете частников</option>
                        {users.map(user => {
                          return (
                            <option key={user.id} value={user.id}>
                              {user.login}
                            </option>
                          );
                        })}
                      </select>
                      {meta.error && meta.touched && <div>{meta.error}</div>}
                    </div>
                  )}
                </Field>
              </div>

              <div className={classes.buttonBar}>
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

  /**
   *  Метод жц компонента
   */
  componentDidMount() {
    // Запрашиваем данные о пользователях
    this.props.loadUsersData();
  }

  sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  onSubmit = async values => {
    await this.sleep(300);
    this.props.createEvent(values);
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
    currentDate: currentDateSelector(state),
    users: usersSelector(state)
  }),
  { changeDate, loadUsersData, createEvent }
)(injectSheet(styles)(EventForm));
