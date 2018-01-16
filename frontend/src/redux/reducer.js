import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import scheduleReducer, {
  moduleName as scheduleModule
} from '../ducks/schedule';
// import peopleReducer, {moduleName as peopleModule} from '../ducks/people'
// import eventsReducer, {moduleName as eventsModule} from '../ducks/events'

export default combineReducers({
  router,
  form,
  [scheduleModule]: scheduleReducer
  // [peopleModule]: peopleReducer,
  // [eventsModule]: eventsReducer,
});
