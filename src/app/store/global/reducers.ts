import { createReducer, on } from '@ngrx/store';
import {
  globalClientError,
  globalServerError,
} from './actions';
import deepcopy from 'deepcopy';

const globalActionsReducers = createReducer(null,
  on(globalClientError, (state, action) => deepcopy(action)),
  on(globalServerError, (state, action) => deepcopy(action)),
);

export function globalActionsReducer(state, action) {
  return globalActionsReducers(state, action);
}
