import { fromJS } from 'immutable';
import {
  STATE_NEW,
  STATE_LOADING,
  STATE_ERROR,
  STATE_OK,
} from '../../constants';
import metricsRoutine from './routines';

const initialState = fromJS({
  shortUrlMetrics: [],
  containerState: STATE_NEW,
  errorMessage: null,
});

export default function metricsReducer(state = initialState, action) {
  switch (action.type) {
    case metricsRoutine.TRIGGER:
      return state.merge({
        containerState: STATE_LOADING,
      });
    case metricsRoutine.REQUEST:
      return state.merge({
        containerState: STATE_LOADING,
      });
    case metricsRoutine.SUCCESS:
      return state.merge({
        containerState: STATE_OK,
        shortUrlMetrics: action.payload,
      });
    case metricsRoutine.FAILURE:
      return state.merge({
        containerState: STATE_ERROR,
        errorMessage: action.payload.error,
      });
    default:
      return state;
  }
}
