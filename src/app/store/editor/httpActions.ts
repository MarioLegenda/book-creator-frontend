import {createAction, props} from '@ngrx/store';

export const actionTypes = {
  EDITOR_HTTP_GET_FILE_CONTENT: '[Http] Get file content',
  EDITOR_HTTP_GET_FILE_CONTENT_FINISHED: '[Http] Get file content finished',
};

export const httpGetFileContentAction = createAction(
  actionTypes.EDITOR_HTTP_GET_FILE_CONTENT,
  props<{}>()
);

export const httpGetFileContentFinishedAction = createAction(
  actionTypes.EDITOR_HTTP_GET_FILE_CONTENT_FINISHED
);
