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

  yield put({
    type: CREATE_EVENT_START
  });

  try {
    const client = new GraphQLClient('my-endpoint', {
      headers: {
        Authorization: 'Bearer my-jwt-token'
      }
    });

    const query = `{
      
                              createEvent(input {id, title, dateStart, dateEnd, users, room})
      }`;

    client.request(query).then(data => console.log(data));
    //
    // const query = `{
    //                    mutation {
    //                       "createEvent": {
    //                         "id" : "test",
    //                         "title" : "test",
    //                         "dateStart" : "test",
    //                         "dateEnd" : "test",
    //                         "users" : "test",
    //                         "room" : "test"
    //                       }
    //                       }
    //
    //                   }`;
    //
    // const dataPromise = request("/graphqul", query);
    //
    // // const newData = yield dataPromise.then(data => {
    // //     return data;
    // // });
    //
    // yield put({
    //   type: CREATE_EVENT_SUCCESS,
    //   // payload: {
    //   //     events: newData.events,
    //   // },
    // });
  } catch (error) {
    yield put({
      type: CREATE_EVENT_ERROR,
      payload: { error }
    });
  }
  // {
  // users: Array(1),
  // theme: "12",
  // start: "12:12",
  // end: "13:11",
  // date: "0001-11-11"
  // }
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
    takeEvery(CREATE_EVENT_REQUEST, createEventSaga)
  ]);
}
