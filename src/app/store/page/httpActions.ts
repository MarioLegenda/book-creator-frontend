import {createAction, props} from '@ngrx/store';

export const actionTypes = {
  HTTP_CREATE_TEXT_BLOCK: '[Http] Create text block',
  HTTP_CREATE_TEXT_BLOCK_FINISHED: '[Http] Create text block finished',
  HTTP_UPDATE_TEXT_BLOCK: '[Http] Update text block',
  HTTP_UPDATE_TEXT_BLOCK_FINISHED: '[Http] Update text block finished',
  HTTP_REMOVE_BLOCK: '[Http] Remove block',
  HTTP_CREATE_CODE_BLOCK: '[Http] Create code block',
  HTTP_UPDATE_CODE_BLOCK: '[Http] Update code block',
  HTTP_CREATE_CODE_BLOCK_FINISHED: '[Http] Create code block',
  HTTP_CREATE_MULTIMEDIA_BLOCK: '[Http] Create multimedia block',
  HTTP_UPDATE_BLOCK_POSITION: '[Http] Update block position',
  HTTP_CREATE_MAIN_HEADER: '[Http] Create main header',
};

export const httpCreateMultimediaBlock = createAction(
  actionTypes.HTTP_CREATE_MULTIMEDIA_BLOCK,
  props<{}>(),
);

export const httpCreateMainHeader = createAction(
  actionTypes.HTTP_CREATE_MAIN_HEADER,
  props<{}>(),
);

export const httpUpdateBlockPosition = createAction(
  actionTypes.HTTP_UPDATE_BLOCK_POSITION,
  props<{}>(),
);

export const httpCreateCodeBlock = createAction(
  actionTypes.HTTP_CREATE_CODE_BLOCK,
  props<{}>(),
);

export const httpUpdateCodeBlock = createAction(
  actionTypes.HTTP_UPDATE_CODE_BLOCK,
  props<{}>(),
);

export const httpCreateTextBlock = createAction(
  actionTypes.HTTP_CREATE_TEXT_BLOCK,
  props<{}>(),
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

export const httpRemoveBlock = createAction(
  actionTypes.HTTP_REMOVE_BLOCK,
  props<{}>()
);
