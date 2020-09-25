import { call, put, takeEvery } from 'redux-saga/effects';

import getConfig from '../../config';
import fileUploadRoutine from './routines';

const axios = require('axios');

function* fetchProcessedFile(action) {
  const config = getConfig();
  const { longUrlsFile } = action.payload;
  const getProcessedFileUrl = `${config.api.protocol}://${config.api.host}:${config.api.port}/short_urls`;

  try {
    // trigger request action
    yield put(fileUploadRoutine.request());

    const formData = new FormData();
    formData.append('short_urls_file', longUrlsFile);

    const response = yield call(axios.post, getProcessedFileUrl, formData);

    // download the file response
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'test.csv');
    document.body.appendChild(link);
    link.click();

    // if request successfully finished
    yield put(fileUploadRoutine.success(response.data));
  } catch (error) {
    // if request failed
    yield put(fileUploadRoutine.failure(error.message));
  }
}

function* fileUploadSaga() {
  yield takeEvery([fileUploadRoutine.TRIGGER], fetchProcessedFile);
}

export default fileUploadSaga;
