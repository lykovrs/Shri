import { all, put, takeEvery } from 'redux-saga/effects';
import { appName } from '../config';
import { Record, List } from 'immutable';
import { request } from 'graphql-request';
import { createSelector } from 'reselect';
import history from '../redux/history';

/**
 * Constants
 * */
export const moduleName = 'users';
const prefix = `${appName}/${moduleName}`;

export const LOAD_DATA_REQUEST = `${prefix}/LOAD_DATA_REQUEST`;
export const LOAD_DATA_START = `${prefix}/LOAD_DATA_START`;
export const LOAD_DATA_SUCCESS = `${prefix}/LOAD_DATA_SUCCESS`;
export const LOAD_DATA_ERROR = `${prefix}/LOAD_DATA_ERROR`;

export const CREATE_USER = `${prefix}/CREATE_USER`;
export const MODIFY_USER = `${prefix}/MODIFY_USER`;
export const DELETE_USER = `${prefix}/DELETE_USER`;

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
        .setIn(['items'], new List(payload.users))
        .setIn(['loading'], false)
        .setIn(['loaded'], true);
    case LOAD_DATA_ERROR:
      return state.setIn(['loading'], false).setIn(['loaded'], false);
    case CREATE_USER:
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

export const usersSelector = createSelector(stateSelector, state =>
  state.items.toJS()
);

/**
 * Action Creators
 * */

/**
 * Создает экшн для запроса данных о пользователях
 * @return {Object}         объект экшена
 */
export function loadUsersData() {
  const action = {
    type: LOAD_DATA_REQUEST
  };

  return action;
}

/**
 * Создает экшн для создания нового пользователя
 * @param user
 * @returns {{type: string, payload: {user: *}}} объект экшена
 */
export function createUser(user) {
  const action = {
    type: CREATE_USER,
    payload: { user }
  };

  return action;
}

/**
 * Создает экшн для редактирования события
 * @param user
 * @returns {{type: string, payload: {user: *}}} объект экшена
 */
export function modifyUser(user) {
  const action = {
    type: MODIFY_USER,
    payload: { user }
  };

  return action;
}

/**
 * Создает экшн для удаления события
 * @param userId
 * @returns {{type: string, payload: {user: *}}} объект экшена
 */
export function deleteUser(userId) {
  const action = {
    type: DELETE_USER,
    payload: { userId }
  };

  return action;
}

/**
 * Sagas
 * */
export const createUserSaga = function(action) {};

export const loadUsersSaga = function*(action) {
  yield put({
    type: LOAD_DATA_START
  });

  try {
    const query = `{
                    users{
                        id
                        login
                        homeFloor
                        avatarUrl
                      }
                    }`;

    const dataPromise = request('/graphqul', query);

    const newData = yield dataPromise.then(data => {
      return data;
    });

    yield put({
      type: LOAD_DATA_SUCCESS,
      payload: {
        users: newData.users
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
    takeEvery(LOAD_DATA_REQUEST, loadUsersSaga),
    takeEvery(CREATE_USER, createUserSaga)
  ]);
}
