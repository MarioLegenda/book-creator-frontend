import { createReducer, on } from '@ngrx/store';
import {
  viewCreatePresentation,
} from './viewActions';
import deepcopy from 'deepcopy';

const viewActionReducers = createReducer(null,
  on(viewCreatePresentation, (state, action) => deepcopy(action)),
);

export function viewActionReducer(state, action) {
  return viewActionReducers(state, action);
}
