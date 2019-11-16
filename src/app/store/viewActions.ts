import { createAction, props } from '@ngrx/store';

export const actionTypes = {
  VIEW_ADD_TEXT_BLOCK: '[View] Create text block',
  VIEW_TEXT_BLOCK_UPDATED: '[Text block action] Text block updated',
  VIEW_TEXT_BLOCK_REMOVED: '[Text block action] Text block removed',
};

export const viewAddTextBlock = createAction(
  actionTypes.VIEW_ADD_TEXT_BLOCK,
  props<object>()
);

export const viewTextBlockUpdated = createAction(
  actionTypes.VIEW_TEXT_BLOCK_UPDATED,
  props<object>()
);

export const viewTextBlockRemoved = createAction(
  actionTypes.VIEW_TEXT_BLOCK_REMOVED,
  props<object>()
);
