import { createReducer, on } from '@ngrx/store';
import {
  viewAddTextBlock,
  viewTextBlockRemoved,
  viewTextBlockUpdated,
  viewCreateCodeBlock,
  viewAddAllBlocks,
  viewAddMultimediaBlock,
  viewAddMainHeaderBlock, viewAddSubheader, viewUpdateSubheaderBlock,
} from './viewActions';
import deepcopy from 'deepcopy';

const viewActionReducers = createReducer(null,
  on(viewAddTextBlock, (state, action) => deepcopy(action)),
  on(viewTextBlockUpdated, (state, action) => deepcopy(action)),
  on(viewTextBlockRemoved, (state, action) => deepcopy(action)),
  on(viewCreateCodeBlock, (state, action) => deepcopy(action)),
  on(viewAddAllBlocks, (state, action) => deepcopy(action)),
  on(viewAddMultimediaBlock, (state, action) => deepcopy(action)),
  on(viewAddMainHeaderBlock, (state, action) => deepcopy(action)),
  on(viewAddSubheader, (state, action) => deepcopy(action)),
  on(viewUpdateSubheaderBlock, (state, action) => deepcopy(action)),
);

export function viewActionReducer(state, action) {
  return viewActionReducers(state, action);
}
