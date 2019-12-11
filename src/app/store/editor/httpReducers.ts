import { createReducer, on } from '@ngrx/store';
import {
  httpGetFileContentAction,
  httpGetFileContentFinishedAction,
} from './httpActions';
import deepcopy from 'deepcopy';

const httpActionsReducers = createReducer(null,
  on(httpGetFileContentAction, (state, action) => deepcopy(action)),
  on(httpGetFileContentFinishedAction, (state, action) => deepcopy(action)),
);

export function editorHttpReducer(state, action) {
  return httpActionsReducers(state, action);
}
