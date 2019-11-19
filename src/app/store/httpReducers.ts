import { createReducer, on } from '@ngrx/store';
import {
  httpCreateTextBlock,
  httpCreateTextBlockFinished,
  httpUpdateTextBlock,
  httpUpdateTextBlockFinished,
  httpRemoveTextBlock,
  httpRemoveTextBlockFinished,
} from './httpActions';
import deepcopy from 'deepcopy';

const httpActionsReducers = createReducer(null,
  on(httpCreateTextBlock, (state, textBlockAction) => deepcopy(textBlockAction)),
  on(httpUpdateTextBlock, (state, textBlockAction) => deepcopy(textBlockAction)),
  on(httpRemoveTextBlock, (state, textBlockAction) => deepcopy(textBlockAction)),
  on(httpCreateTextBlockFinished, (state, textBlockAction) => deepcopy(textBlockAction)),
  on(httpUpdateTextBlockFinished, (state, textBlockAction) => deepcopy(textBlockAction)),
  on(httpRemoveTextBlockFinished, (state, textBlockAction) => deepcopy(textBlockAction)),
);

export function httpActionReducer(state, action) {
  return httpActionsReducers(state, action);
}
