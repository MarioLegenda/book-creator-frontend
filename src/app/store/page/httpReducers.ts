import { createReducer, on } from '@ngrx/store';
import {
  httpCreateTextBlock,
  httpCreateTextBlockFinished,
  httpUpdateTextBlock,
  httpUpdateTextBlockFinished,
  httpRemoveBlock,
  httpCreateCodeBlock,
  httpUpdateCodeBlock,
  httpCreateMultimediaBlock,
} from './httpActions';
import deepcopy from 'deepcopy';

const httpActionsReducers = createReducer(null,
  on(httpCreateTextBlock, (state, action) => deepcopy(action)),
  on(httpUpdateTextBlock, (state, action) => deepcopy(action)),
  on(httpRemoveBlock, (state, action) => deepcopy(action)),
  on(httpCreateTextBlockFinished, (state, action) => deepcopy(action)),
  on(httpUpdateTextBlockFinished, (state, action) => deepcopy(action)),
  on(httpCreateCodeBlock, (state, action) => deepcopy(action)),
  on(httpUpdateCodeBlock, (state, action) => deepcopy(action)),
  on(httpCreateMultimediaBlock, (state, action) => deepcopy(action)),
);

export function httpActionReducer(state, action) {
  return httpActionsReducers(state, action);
}
