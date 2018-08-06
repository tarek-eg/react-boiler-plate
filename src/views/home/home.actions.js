// export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
// export const RESET_HOME_STATE = 'RESET_HOME_STATE';
//
// export const incrementCounter = () => ({
//   type: INCREMENT_COUNTER,
// });
//
// export const resetHomeState = () => ({
//   type: RESET_HOME_STATE,
// });

export const REQUEST_HOME_EVENTS = 'REQUEST_HOME_EVENTS';
export const HOME_EVENTS_SUCCESS = 'HOME_EVENTS_SUCCESS';
export const HOME_EVENTS_FAILURE = 'HOME_EVENTS_FAILURE';

export const requestHomeEvents = payload => ({
  type: REQUEST_HOME_EVENTS,
  payload
});
