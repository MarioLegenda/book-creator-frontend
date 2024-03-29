import {createAction, props} from '@ngrx/store';

export const actionTypes = {
  VIEW_ADD_TEXT_BLOCK: '[View] Create text block',
  VIEW_TEXT_BLOCK_UPDATED: '[View] Text block updated',
  VIEW_TEXT_BLOCK_REMOVED: '[View] Text block removed',
  VIEW_ADD_ALL_BLOCKS: '[View] View add all blocks',
  VIEW_ADD_CODE_BLOCK: '[View] Create code block',
  VIEW_ADD_MULTIMEDIA_BLOCK: '[View] Create multimedia block',
  VIEW_ADD_MAIN_HEADER_BLOCK: '[View] Create main header block',
  VIEW_ADD_SUBHEADER: '[View] Create subheader block',
  VIEW_UPDATE_SUBHEADER: '[View] Update subheader block',
  VIEW_ADD_QUOTE_BLOCK: '[View] Create quote block',
};

export const viewCreateCodeBlock = createAction(
  actionTypes.VIEW_ADD_CODE_BLOCK,
  props<{}>(),
);

export const viewUpdateSubheaderBlock = createAction(
  actionTypes.VIEW_UPDATE_SUBHEADER,
  props<{}>(),
);

export const viewAddQuoteBlock = createAction(
  actionTypes.VIEW_ADD_QUOTE_BLOCK,
  props<{}>(),
);

export const viewAddSubheader = createAction(
  actionTypes.VIEW_ADD_SUBHEADER,
  props<{}>(),
);

export const viewAddMainHeaderBlock = createAction(
  actionTypes.VIEW_ADD_MAIN_HEADER_BLOCK,
  props<{}>(),
);

export const viewAddMultimediaBlock = createAction(
  actionTypes.VIEW_ADD_MULTIMEDIA_BLOCK,
  props<{}>(),
);

export const viewAddTextBlock = createAction(
  actionTypes.VIEW_ADD_TEXT_BLOCK,
  props<{}>(),
);

export const viewAddAllBlocks = createAction(
  actionTypes.VIEW_ADD_ALL_BLOCKS,
  props<{}>(),
);

export const viewTextBlockUpdated = createAction(
  actionTypes.VIEW_TEXT_BLOCK_UPDATED
);

export const viewTextBlockRemoved = createAction(
  actionTypes.VIEW_TEXT_BLOCK_REMOVED,
  props<{}>()
);
