import { Map, List } from 'immutable';

import {
  REQUEST_HOME_EVENTS,
  HOME_EVENTS_FAILURE,
  HOME_EVENTS_SUCCESS,
} from './home.actions';

const initialState = Map({
  isFetching: false,
  events: List([]),
  error: '',
});

const home = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_HOME_EVENTS:
      return state.set('isFetching', true);

    case HOME_EVENTS_SUCCESS:
      return state
        .set('isFetching', false)
        .set('events', List(action.events));

    case HOME_EVENTS_FAILURE:
      return state
        .set('isFetching', false)
        .set('error', action.error);

    default:
      return state;
  }
};

export default home;
