import { fromJS } from 'immutable';
import {
  STATE_NEW,
  STATE_LOADING,
  STATE_ERROR,
  STATE_OK,
} from '../../constants';
import fileUploadRoutine from './routines';

const initialState = fromJS({
  processedFile: {},
  containerState: STATE_NEW,
  errorMessage: null,
});

export default function fileUploadReducer(state = initialState, action) {
  switch (action.type) {
    case fileUploadRoutine.TRIGGER:
      return state.merge({
        containerState: STATE_LOADING,
      });
    case fileUploadRoutine.REQUEST:
      return state.merge({
        containerState: STATE_LOADING,
      });
    case fileUploadRoutine.SUCCESS:
      return state.merge({
        containerState: STATE_OK,
        processedFile: action.payload,
      });
    case fileUploadRoutine.FAILURE:
      return state.merge({
        containerState: STATE_ERROR,
        errorMessage: action.payload.error,
      });
    default:
      return state;
  }
}
