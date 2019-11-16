import { createReducer, on } from '@ngrx/store';
import { viewAddTextBlock, viewTextBlockRemoved, viewTextBlockUpdated } from './viewActions';
import deepcopy from 'deepcopy';

const viewActionReducers = createReducer(null,
  on(viewAddTextBlock, (state, textBlockAction) => deepcopy(textBlockAction)),
  on(viewTextBlockUpdated, (state, textBlockAction) => deepcopy(textBlockAction)),
  on(viewTextBlockRemoved, (state, textBlockAction) => deepcopy(textBlockAction)),
);

export function viewActionReducer(state, action) {
  return viewActionReducers(state, action);
}
