import { createReducer, on } from '@ngrx/store';
import {
  viewAddTextBlock,
  viewTextBlockRemoved,
  viewTextBlockUpdated,
  viewCreatePresentation, viewCreateCodeBlock
} from './viewActions';
import deepcopy from 'deepcopy';

const viewActionReducers = createReducer(null,
  on(viewAddTextBlock, (state, action) => deepcopy(action)),
  on(viewTextBlockUpdated, (state, action) => deepcopy(action)),
  on(viewTextBlockRemoved, (state, action) => deepcopy(action)),
  on(viewCreatePresentation, (state, action) => deepcopy(action)),
  on(viewCreateCodeBlock, (state, action) => deepcopy(action)),
);

export function viewActionReducer(state, action) {
  return viewActionReducers(state, action);
}
