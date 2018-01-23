import { all, put, takeEvery } from 'redux-saga/effects';
import { appName } from '../config';
import { Record, List } from 'immutable';
import { request } from 'graphql-request';
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

export const CREATE_EVENT = `${prefix}/CREATE_EVENT`;
export const MODIFY_EVENT = `${prefix}/MODIFY_EVENT`;
export const DELETE_EVENT = `${prefix}/DELETE_EVENT`;

/**
 * Reducer
 * */
export const ReducerRecord = Record({
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
    case CREATE_EVENT:
      return state;
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

export const eventsSelector = createSelector(
  stateSelector,
  state => state.items
);

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
 * Создает экшн для создания события
 * @param event
 * @returns {{type: string, payload: {event: *}}} объект экшена
 */
export function createEvent(event) {
  const action = {
    type: CREATE_EVENT,
    payload: { event }
  };

  return action;
}

/**
 * Создает экшн для редактирования события
 * @param event
 * @returns {{type: string, payload: {event: *}}} объект экшена
 */
export function modifyEvent(event) {
  const action = {
    type: MODIFY_EVENT,
    payload: { event }
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
export const createEventSaga = function(action) {};

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

export function* saga() {
  yield all([
    takeEvery(LOAD_DATA_REQUEST, loadEventsSaga),
    takeEvery(CREATE_EVENT, createEventSaga)
  ]);
}
