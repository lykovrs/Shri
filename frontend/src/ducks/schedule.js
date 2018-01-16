import { all, put, takeEvery } from 'redux-saga/effects';
import { appName } from '../config';
import { Record } from 'immutable';

import { createSelector } from 'reselect';

/**
 * Constants
 * */
export const moduleName = 'schedule';
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
  loaded: false
});

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action;

  switch (type) {
    // case LOAD_DATA_START:
    //     return state.setIn(["loading"], true);
    // case LOAD_DATA_SUCCESS:
    //     return (
    //         state
    //         // .setIn(["data"], new List(payload.data))
    //             .setIn(["loading"], false)
    //             .setIn(["loaded"], true)
    //     );
    // case LOAD_DATA_ERROR:
    //     return state.setIn(["loading"], false).setIn(["loaded"], false);
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
 * Создает экшн для запрос данных для формирования отчетов
 * @return {Object}         объект экшена
 */
// export function loadData() {
//     const action = {
//         type: LOAD_DATA_REQUEST
//     };
//
//     return action;
// }

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
export const identifyFridgeSaga = function*(action) {
  debugger;
  console.log('saga => ', action);
  const { report } = action.payload;

  yield put({
    type: LOAD_DATA_START
  });

  let promise = new Promise(function(resolve) {
    setTimeout(() => {
      resolve(report);
    }, 2000);
  });

  try {
    //TODO: Здесь сделать нормальную логику запроса данных

    // throw new Error("Ошибка получения данных");
    const newPlanagramm = yield promise.then(result => {
      return result;
    });

    yield put({
      type: LOAD_DATA_SUCCESS,
      payload: {
        data: JSON.parse(newPlanagramm, (key, value) => {
          if (key === 'recdate') return new Date(value);
          return value;
        })
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
  yield all([takeEvery(LOAD_DATA_REQUEST, identifyFridgeSaga)]);
}
