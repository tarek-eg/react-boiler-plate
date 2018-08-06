import { put, takeEvery, call } from 'redux-saga/effects';
import ResourceStrings from '../../resources';
import api from '../../core/api/index';

import {
  REQUEST_HOME_EVENTS,
  HOME_EVENTS_FAILURE,
  HOME_EVENTS_SUCCESS
} from './home.actions';

export function* getHomeEvents(){
  try{
    const events = yield call(api, {
      method: 'GET',
      url:  '/v2/api/pages/events-list?per-page=12'
    });

    if(events && events.status >= 200 && events.status <=299){
      yield put({
        type: HOME_EVENTS_SUCCESS,
        events: events.data.success.events,
      });
    } else {
      const message = (events && events.response && events.data.error.message) || ResourceStrings.defaultError;
      yield put({
        type: HOME_EVENTS_FAILURE,
        error: message
      });
    }

  } catch(e) {
    throw Error('Something went wrong while executing saga', e);
  }
}

export function* getHomeEventsSaga(){
  yield takeEvery(REQUEST_HOME_EVENTS, getHomeEvents);
}