import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

// eslint-disable-next-line
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const logger = createLogger({ collapsed: true });
const sagaMiddleware = createSagaMiddleware();
let middleware = [sagaMiddleware];

if (process.env.NODE_ENV !== 'production') {
  middleware = [...middleware, logger];
}

const configureStore = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

sagaMiddleware.run(rootSaga);

export default configureStore;
