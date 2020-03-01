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
  httpUpdateBlockPosition,
  httpCreateMainHeader,
  httpUpdateMainHeader, httpCreateSubheader, httpUpdateSubheader, httpCreateQuoteBlock, httpUpdateQuoteBlock,
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
  on(httpUpdateBlockPosition, (state, action) => deepcopy(action)),
  on(httpCreateMainHeader, (state, action) => deepcopy(action)),
  on(httpUpdateMainHeader, (state, action) => deepcopy(action)),
  on(httpCreateSubheader, (state, action) => deepcopy(action)),
  on(httpUpdateSubheader, (state, action) => deepcopy(action)),
  on(httpCreateQuoteBlock, (state, action) => deepcopy(action)),
  on(httpUpdateQuoteBlock, (state, action) => deepcopy(action)),
);

export function httpActionReducer(state, action) {
  return httpActionsReducers(state, action);
}
