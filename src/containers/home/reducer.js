import { fromJS } from 'immutable';
import {
  STATE_NEW,
  STATE_LOADING,
  STATE_ERROR,
  STATE_OK,
} from '../../constants';
import homeRoutine from './routines';

const initialState = fromJS({
  shortUrl: '',
  containerState: STATE_NEW,
  errorMessage: null,
});

export default function homeReducer(state = initialState, action) {
  switch (action.type) {
    case homeRoutine.TRIGGER:
      return state.merge({
        containerState: STATE_LOADING,
      });
    case homeRoutine.REQUEST:
      return state.merge({
        containerState: STATE_LOADING,
      });
    case homeRoutine.SUCCESS:
      return state.merge({
        containerState: STATE_OK,
        shortUrl: action.payload.short_url_link,
      });
    case homeRoutine.FAILURE:
      return state.merge({
        containerState: STATE_ERROR,
        errorMessage: action.payload.error,
      });
    default:
      return state;
  }
}
