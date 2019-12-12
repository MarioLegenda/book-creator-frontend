import {createAction, props} from '@ngrx/store';

export const actionTypes = {
  EDITOR_HTTP_GET_FILE_CONTENT: '[Http] Get file content',
  EDITOR_HTTP_GET_FILE_CONTENT_FINISHED: '[Http] Get file content finished',
  EDITOR_HTTP_REMOVE_FILE: '[Http] Remove file',
  EDITOR_HTTP_REMOVE_FILE_FINISHED: '[Http] Remove file finished',
};

export const httpGetFileContentAction = createAction(
  actionTypes.EDITOR_HTTP_GET_FILE_CONTENT,
  props<{}>()
);

export const httpGetFileContentFinishedAction = createAction(
  actionTypes.EDITOR_HTTP_GET_FILE_CONTENT_FINISHED
);

export const httpRemoveFile = createAction(
  actionTypes.EDITOR_HTTP_REMOVE_FILE,
  props<{}>()
);

export const httpRemoveFileFinished = createAction(
  actionTypes.EDITOR_HTTP_REMOVE_FILE_FINISHED,
  props<{}>(),
);
