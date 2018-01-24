import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import roomsReducer, { moduleName as roomsModule } from '../ducks/rooms';
import eventsReducer, { moduleName as eventsModule } from '../ducks/events';
import usersReducer, { moduleName as usersModule } from '../ducks/users';

export default combineReducers({
  router,
  form,
  [roomsModule]: roomsReducer,
  [eventsModule]: eventsReducer,
  [usersModule]: usersReducer
});
