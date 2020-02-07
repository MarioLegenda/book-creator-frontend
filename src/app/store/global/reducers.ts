import { createReducer, on } from '@ngrx/store';
import {
  globalClientError,
  globalServerError,
} from './actions';
import deepcopy from 'deepcopy';

const globalErrorReducers = createReducer(null,
  on(globalClientError, (state, action) => deepcopy(action)),
  on(globalServerError, (state, action) => deepcopy(action)),
);

export function globalErrorReducer(state, action) {
  return globalErrorReducers(state, action);
}
