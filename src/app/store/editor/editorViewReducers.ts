import { createReducer, on } from '@ngrx/store';
import {
  viewEditorShowFile
} from './editorViewActions';
import deepcopy from 'deepcopy';

const editorActionReducers = createReducer(null,
  on(viewEditorShowFile, (state, action) => deepcopy(action)),
);

export function editorActionReducer(state, action) {
  return editorActionReducers(state, action);
}
