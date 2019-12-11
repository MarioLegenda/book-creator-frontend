import { createReducer, on } from '@ngrx/store';
import {
  httpCreateTextBlock,
  httpCreateTextBlockFinished,
  httpUpdateTextBlock,
  httpUpdateTextBlockFinished,
  httpRemoveTextBlock,
  httpRemoveTextBlockFinished,
  httpCreateCodeBlock,
} from './httpActions';
import deepcopy from 'deepcopy';

const httpActionsReducers = createReducer(null,
  on(httpCreateTextBlock, (state, action) => deepcopy(action)),
  on(httpUpdateTextBlock, (state, action) => deepcopy(action)),
  on(httpRemoveTextBlock, (state, action) => deepcopy(action)),
  on(httpCreateTextBlockFinished, (state, action) => deepcopy(action)),
  on(httpUpdateTextBlockFinished, (state, action) => deepcopy(action)),
  on(httpRemoveTextBlockFinished, (state, action) => deepcopy(action)),
  on(httpCreateCodeBlock, (state, action) => deepcopy(action)),
);

export function httpActionReducer(state, action) {
  return httpActionsReducers(state, action);
}
