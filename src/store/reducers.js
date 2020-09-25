/* eslint-disable import/no-unresolved */
/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import { combineReducers } from 'redux-immutable';

import homeReducer from 'containers/home/reducer';
import metricsReducer from 'containers/short_url_metrics/reducer';

/**
 * Merges the main reducer with the router state
 * and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    home: homeReducer,
    metrics: metricsReducer,

    ...injectedReducers,
  });

  return rootReducer;
}
