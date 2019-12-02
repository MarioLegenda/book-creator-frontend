import {createAction, props} from '@ngrx/store';

export const actionTypes = {
  HTTP_CREATE_TEXT_BLOCK: '[Http] Create text block',
  HTTP_CREATE_TEXT_BLOCK_FINISHED: '[Http] Create text block finished',
  HTTP_UPDATE_TEXT_BLOCK: '[Http] Update text block',
  HTTP_UPDATE_TEXT_BLOCK_FINISHED: '[Http] Update text block finished',
  HTTP_REMOVE_TEXT_BLOCK: '[Http] Remove text block',
  HTTP_REMOVE_TEXT_BLOCK_FINISHED: '[Http] Remove text block finished',
  HTTP_CREATE_PRESENTATION: '[Http] Create presentation',
  HTTP_CREATE_PRESENTATION_FINISHED: '[Http] Create presentation finished',
  HTTP_CREATE_CODE_BLOCK: '[Http] Create code block',
  HTTP_CREATE_CODE_BLOCK_FINISHED: '[Http] Create code block',
};

export const httpCreatePresentation = createAction(
  actionTypes.HTTP_CREATE_PRESENTATION,
  props<{}>()
);

export const httpCreateCodeBlock = createAction(
  actionTypes.HTTP_CREATE_CODE_BLOCK
);

export const httpCreatePresentationFinished = createAction(
  actionTypes.HTTP_CREATE_PRESENTATION_FINISHED
);

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
