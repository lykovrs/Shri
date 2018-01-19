import { all, put, takeEvery } from 'redux-saga/effects';
import { appName } from '../config';
import { Record, List } from 'immutable';
import { request } from 'graphql-request';
import { createSelector } from 'reselect';

/**
 * Constants
 * */
export const moduleName = 'rooms';
const prefix = `${appName}/${moduleName}`;

export const LOAD_DATA_REQUEST = `${prefix}/LOAD_DATA_REQUEST`;
export const LOAD_DATA_START = `${prefix}/LOAD_DATA_START`;
export const LOAD_DATA_SUCCESS = `${prefix}/LOAD_DATA_SUCCESS`;
export const LOAD_DATA_ERROR = `${prefix}/LOAD_DATA_ERROR`;

export const SET_DATE = `${prefix}/SET_DATE`;

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  currentDate: new Date(),
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
        .setIn(['items'], new List(payload.rooms))
        .setIn(['loading'], false)
        .setIn(['loaded'], true);
    case LOAD_DATA_ERROR:
      return state.setIn(['loading'], false).setIn(['loaded'], false);
    case SET_DATE:
      return state.setIn(['currentDate'], payload.date);
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

export const currentDateSelector = createSelector(
  stateSelector,
  state => state.currentDate
);

export const roomsSelector = createSelector(stateSelector, state => {
  let rows = new Map();
  state.items.forEach(room => {
    if (!rows.get(room.floor)) rows.set(room.floor, []);
    rows.set(room.floor, [...rows.get(room.floor), room]);
  });
  return rows;
});

// const valueout = state[moduleName].data.map(item => {
//     return { x: item.recdate, y: item.valueout };
// });
//
// const valuein = state[moduleName].data.map(item => {
//     return { x: item.recdate, y: item.valuein };
// });

/**
 * Action Creators
 * */

/**
 * Создает экшн для запроса данных о переговорках
 * @return {Object}         объект экшена
 */
export function loadRoomsData() {
  const action = {
    type: LOAD_DATA_REQUEST
  };

  return action;
}

/**
 * Создает экшн для смены выбранной даты
 * @return {Object}         объект экшена
 */
export function changeDate(date) {
  const action = {
    type: SET_DATE,
    payload: { date }
  };

  return action;
}

/**
 * Sagas
 * */
export const loadRoomSaga = function*(action) {
  yield put({
    type: LOAD_DATA_START
  });

  try {
    const query = `{
                    rooms {
                      id
                      title
                      capacity
                      floor
                      }
                    }`;

    const dataPromise = request('/graphqul', query);

    const newData = yield dataPromise.then(data => {
      return data;
    });

    yield put({
      type: LOAD_DATA_SUCCESS,
      payload: {
        rooms: newData.rooms
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
  yield all([takeEvery(LOAD_DATA_REQUEST, loadRoomSaga)]);
}
