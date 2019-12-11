import { createReducer, on } from '@ngrx/store';
import {
  httpCreatePresentation,
  httpCreatePresentationFinished,
} from './httpActions';
import deepcopy from 'deepcopy';

const httpActionsReducers = createReducer(null,
  on(httpCreatePresentation, (state, action) => deepcopy(action)),
  on(httpCreatePresentationFinished, (state, action) => deepcopy(action)),
);

export function httpActionReducer(state, action) {
  return httpActionsReducers(state, action);
}
