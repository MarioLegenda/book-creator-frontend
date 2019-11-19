import {createAction, props} from '@ngrx/store';

export const actionTypes = {
  VIEW_ADD_TEXT_BLOCK: '[View] Create text block',
  VIEW_TEXT_BLOCK_UPDATED: '[View] Text block updated',
  VIEW_TEXT_BLOCK_REMOVED: '[View] Text block removed',
};

export const viewAddTextBlock = createAction(
  actionTypes.VIEW_ADD_TEXT_BLOCK,
  props<{}>(),
);

export const viewTextBlockUpdated = createAction(
  actionTypes.VIEW_TEXT_BLOCK_UPDATED
);

export const viewTextBlockRemoved = createAction(
  actionTypes.VIEW_TEXT_BLOCK_REMOVED,
  props<{}>()
);
