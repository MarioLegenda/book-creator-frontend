import {createAction, props} from '@ngrx/store';

export const actionTypes = {
  HTTP_CREATE_TEXT_BLOCK: '[Http] Create text block',
  HTTP_CREATE_TEXT_BLOCK_FINISHED: '[Http] Create text block finished',
  HTTP_UPDATE_TEXT_BLOCK: '[Http] Update text block',
  HTTP_UPDATE_TEXT_BLOCK_FINISHED: '[Http] Update text block finished',
  HTTP_REMOVE_TEXT_BLOCK: '[Http] Remove text block',
  HTTP_REMOVE_TEXT_BLOCK_FINISHED: '[Http] Remove text block finished',
};

export const httpCreateTextBlock = createAction(
  actionTypes.HTTP_CREATE_TEXT_BLOCK,
);

export const httpCreateTextBlockFinished = createAction(
  actionTypes.HTTP_CREATE_TEXT_BLOCK_FINISHED,
);

export const httpUpdateTextBlock = createAction(
  actionTypes.HTTP_UPDATE_TEXT_BLOCK,
  props<{}>(),
);

export const httpUpdateTextBlockFinished = createAction(
  actionTypes.HTTP_UPDATE_TEXT_BLOCK_FINISHED,
  props<{}>(),
);

export const httpRemoveTextBlock = createAction(
  actionTypes.HTTP_REMOVE_TEXT_BLOCK,
  props<{}>()
);

export const httpRemoveTextBlockFinished = createAction(
  actionTypes.HTTP_REMOVE_TEXT_BLOCK_FINISHED,
  props<{}>()
);
