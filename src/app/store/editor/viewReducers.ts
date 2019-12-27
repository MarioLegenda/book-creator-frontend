import { createReducer, on } from '@ngrx/store';
import {
  viewEditorDirectoryEmptied,
  viewEditorShowFile,
} from './viewActions';
import deepcopy from 'deepcopy';

const editorActionReducers = createReducer(null,
  on(viewEditorShowFile, (state, action) => deepcopy(action)),
  on(viewEditorDirectoryEmptied, (state, action) => deepcopy(action)),
);

export function editorViewReducer(state, action) {
  return editorActionReducers(state, action);
}
