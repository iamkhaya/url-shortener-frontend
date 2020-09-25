import { call, put, takeEvery } from 'redux-saga/effects';

import getConfig from '../../config';
import homeRoutine from './routines';

const axios = require('axios');

function* shortenUrl(action) {
  const config = getConfig();
  const { longUrl } = action.payload;
  const getShortUrlPath = `${config.api.protocol}://${config.api.host}:${config.api.port}/shorten_url`;

  try {
    // trigger request action
    yield put(homeRoutine.request());

    const response = yield call(axios.post, getShortUrlPath, {
      long_url: longUrl,
    });
    // if request successfully finished
    yield put(homeRoutine.success(response.data));
  } catch (error) {
    // if request failed
    yield put(homeRoutine.failure(error.message));
  }
}

function* homeSaga() {
  yield takeEvery([homeRoutine.TRIGGER], shortenUrl);
}

export default homeSaga;
