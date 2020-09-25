/* eslint-disable no-unused-vars */
/* eslint-disable global-require */
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import fileUploadSaga from 'containers/file_upload/saga';
import homeSaga from 'containers/home/saga';
import metricsSaga from 'containers/short_url_metrics/saga';
import createReducer from './reducers';

// const history = createBrowserHistory();

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const makeStore = (context) => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(createReducer(), bindMiddleware([sagaMiddleware]));

  store.sagaTask = sagaMiddleware.run(homeSaga);
  store.sagaTask = sagaMiddleware.run(metricsSaga);
  store.sagaTask = sagaMiddleware.run(fileUploadSaga);


  return store;
};

export default makeStore;
