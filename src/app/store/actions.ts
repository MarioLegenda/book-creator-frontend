import { createAction, props } from '@ngrx/store';

export const actionTypes = {
  ADD_TEXT_BLOCK: '[Cms Menu] Create text block view',
  TEXT_BLOCK_CREATED: '[Text block action] Text block created',
  TEXT_BLOCK_UPDATED: '[Text block action] Text block updated',
  TEXT_BLOCK_REMOVED: '[Text block action] Text block removed',
};

export const textBlockMenuClicked = createAction(actionTypes.ADD_TEXT_BLOCK);

export const textBlockCreated = createAction(
  actionTypes.TEXT_BLOCK_CREATED,
  props<object>()
);

export const textBlockRemoved = createAction(
  actionTypes.TEXT_BLOCK_REMOVED,
  props<object>()
);

export const textBlockUpdated = createAction(actionTypes.TEXT_BLOCK_UPDATED);
