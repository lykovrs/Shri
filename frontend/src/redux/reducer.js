import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import roomsReducer, { moduleName as roomsModule } from '../ducks/rooms';
// import peopleReducer, {moduleName as peopleModule} from '../ducks/people'
// import eventsReducer, {moduleName as eventsModule} from '../ducks/events'

export default combineReducers({
  router,
  form,
  [roomsModule]: roomsReducer
  // [peopleModule]: peopleReducer,
  // [eventsModule]: eventsReducer,
});
