import { call, put, takeEvery } from 'redux-saga/effects';

import getConfig from '../../config';
import metricsRoutine from './routines';

const axios = require('axios');

function* fetchshortUrlMetrics(action) {
  const config = getConfig();
  const { shortUrlId } = action.payload;
  const getShortUrlMetricsPath = `${config.api.protocol}://${config.api.host}:${config.api.port}/short_url/metrics?short_url=${shortUrlId}`;

  try {
    // trigger request action
    yield put(metricsRoutine.request());

    const response = yield call(axios.get, getShortUrlMetricsPath);
    // if request successfully finished
    yield put(metricsRoutine.success(response.data));
  } catch (error) {
    // if request failed
    yield put(metricsRoutine.failure(error.message));
  }
}

function* metricsSaga() {
  yield takeEvery([metricsRoutine.TRIGGER], fetchshortUrlMetrics);
}

export default metricsSaga;
