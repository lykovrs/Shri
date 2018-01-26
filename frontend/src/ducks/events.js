import { all, put, takeEvery } from 'redux-saga/effects';
import { appName } from '../config';
import { Record, List } from 'immutable';
import { request, GraphQLClient } from 'graphql-request';
import { createSelector } from 'reselect';
import history from '../redux/history';

/**
 * Constants
 * */
export const moduleName = 'events';
const prefix = `${appName}/${moduleName}`;

export const LOAD_DATA_REQUEST = `${prefix}/LOAD_DATA_REQUEST`;
export const LOAD_DATA_START = `${prefix}/LOAD_DATA_START`;
export const LOAD_DATA_SUCCESS = `${prefix}/LOAD_DATA_SUCCESS`;
export const LOAD_DATA_ERROR = `${prefix}/LOAD_DATA_ERROR`;

export const LOAD_EVENT_REQUEST = `${prefix}/LOAD_EVENT_REQUEST`;
export const LOAD_EVENT_START = `${prefix}/LOAD_EVENT_START`;
export const LOAD_EVENT_SUCCESS = `${prefix}/LOAD_EVENT_SUCCESS`;
export const LOAD_EVENT_ERROR = `${prefix}/LOAD_EVENT_ERROR`;

export const CREATE_EVENT_REQUEST = `${prefix}/CREATE_EVENT_REQUEST`;
export const CREATE_EVENT_START = `${prefix}/CREATE_EVENT_START`;
export const CREATE_EVENT_SUCCESS = `${prefix}/CREATE_EVENT_SUCCESS`;
export const CREATE_EVENT_ERROR = `${prefix}/CREATE_EVENT_ERROR`;

export const MODIFY_EVENT = `${prefix}/MODIFY_EVENT`;
export const DELETE_EVENT = `${prefix}/DELETE_EVENT`;

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  editable: null,
  loading: false,
  loaded: false,
  items: new List([])
});

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_DATA_START:
      return state.setIn(['loading'], true);
    case LOAD_DATA_SUCCESS:
      return state
        .setIn(['items'], new List(payload.events))
        .setIn(['loading'], false)
        .setIn(['loaded'], true);
    case LOAD_DATA_ERROR:
      return state.setIn(['loading'], false).setIn(['loaded'], false);

    case LOAD_EVENT_START:
      return state.setIn(['loading'], true);
    case LOAD_EVENT_SUCCESS:
      return state
        .setIn(['editable'], payload.event)
        .setIn(['loading'], false)
        .setIn(['loaded'], true);
    case LOAD_EVENT_ERROR:
      return state.setIn(['loading'], false).setIn(['loaded'], false);
    case CREATE_EVENT_START:
      return state.setIn(['loading'], true);
    case CREATE_EVENT_SUCCESS:
      return state.setIn(['loading'], false).setIn(['loaded'], true);
    default:
      return state;
  }
}

/**
 * Selectors
 * */
export const stateSelector = state => state[moduleName];
export const loadingSelector = createSelector(
  stateSelector,
  state => state.loading
);
export const loadedSelector = createSelector(
  stateSelector,
  state => state.loaded
);

export const eventsSelector = createSelector(stateSelector, state =>
  state.items.toJS()
);

export const editableEventsSelector = createSelector(stateSelector, state => {
  const { editable } = state;
  return {
    theme: (editable && editable.title) || '',
    users: (editable && editable.users) || [],
    date: '0222-02-12',
    start: '12:02',
    end: '22:02'
  };
});

/**
 * Action Creators
 * */

/**
 * Создает экшн для запроса данных о событиях
 * @return {Object}         объект экшена
 */
export function loadEventsData() {
  const action = {
    type: LOAD_DATA_REQUEST
  };

  return action;
}

/**
 * Создает экшн для запроса одной статьи
 * @param id
 * @return {Object}         объект экшена
 */
export function loadEventData(id) {
  const action = {
    type: LOAD_EVENT_REQUEST,
    payload: { id }
  };

  return action;
}

/**
 * Создает экшн для создания события
 * @param newEvent
 * @returns {{type: string, payload: {event: *}}} объект экшена
 */
export function createEvent(newEvent) {
  const action = {
    type: CREATE_EVENT_REQUEST,
    payload: { newEvent }
  };

  return action;
}

/**
 * Создает экшн для редактирования события
 * @param eventId
 * @returns {{type: string, payload: {eventId: string}}} объект экшена
 */
export function modifyEvent(eventId) {
  const action = {
    type: MODIFY_EVENT,
    payload: { eventId }
  };

  return action;
}

/**
 * Создает экшн для удаления события
 * @param eventId
 * @returns {{type: string, payload: {event: *}}} объект экшена
 */
export function deleteEvent(eventId) {
  const action = {
    type: DELETE_EVENT,
    payload: { eventId }
  };

  return action;
}

/**
 * Sagas
 * */
export const createEventSaga = function*(action) {
  const { newEvent } = action.payload;
  const { users, theme, date, start, end } = newEvent;

  yield put({
    type: CREATE_EVENT_START
  });

  try {
    const query = `mutation {
                              createEvent(input: {title: "${theme}", dateStart: "${date}T${start}:00.000Z", dateEnd: "${date}T${end}:00.000Z"},  usersIds: ${users}, roomId: "10") {
                                id
                                title
                                dateStart
                                dateEnd 
                              }
                            }`;

    const dataPromise = request('/graphqul', query);

    const newData = yield dataPromise.then(data => {
      return data;
    });

    yield put({
      type: CREATE_EVENT_SUCCESS,
      payload: {
        events: newData.events
      }
    });
  } catch (error) {
    yield put({
      type: CREATE_EVENT_ERROR,
      payload: { error }
    });
  }
};

export const loadEventsSaga = function*(action) {
  yield put({
    type: LOAD_DATA_START
  });

  try {
    const query = `{
                    events {
                      id
                      title
                      dateStart
                      dateEnd
                    }
                  }`;

    const dataPromise = request('/graphqul', query);

    const newData = yield dataPromise.then(data => {
      return data;
    });

    yield put({
      type: LOAD_DATA_SUCCESS,
      payload: {
        events: newData.events
      }
    });
  } catch (error) {
    yield put({
      type: LOAD_DATA_ERROR,
      payload: { error }
    });
  }
};

export const loadEventSaga = function*(action) {
  const { id } = action.payload;

  yield put({
    type: LOAD_EVENT_START
  });

  try {
    const query = `{
                          event(id:${id}) {
                            id
                            title
                            dateStart
                            dateEnd
                            users {
                              id
                            }
                            room {
                              id
                            }
                          }
                        }`;

    const dataPromise = request('/graphqul', query);

    const newData = yield dataPromise.then(data => {
      return data;
    });

    yield put({
      type: LOAD_EVENT_SUCCESS,
      payload: {
        event: newData.event
      }
    });
  } catch (error) {
    yield put({
      type: LOAD_EVENT_ERROR,
      payload: { error }
    });
  }
};

export function* saga() {
  yield all([
    takeEvery(LOAD_DATA_REQUEST, loadEventsSaga),
    takeEvery(LOAD_EVENT_REQUEST, loadEventSaga),
    takeEvery(CREATE_EVENT_REQUEST, createEventSaga)
  ]);
}
