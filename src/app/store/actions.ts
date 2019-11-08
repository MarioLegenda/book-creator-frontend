import { createAction, props } from '@ngrx/store';

export const actionTypes = {
  ADD_TEXT_BLOCK: '[Cms Menu] Create text block view',
  TEXT_BLOCK_CREATED: '[Text block action] Text block created',
  TEXT_BLOCK_UPDATED: '[Text block action] Text block updated',
};

export const textBlockMenuClicked = createAction(actionTypes.ADD_TEXT_BLOCK);

export const textBlockCreated = createAction(
  actionTypes.TEXT_BLOCK_CREATED,
  props<{ internalName: string; shortDescription: string }>()
);

export const textBlockUpdated = createAction(actionTypes.TEXT_BLOCK_UPDATED);
