import {createAction, props} from '@ngrx/store';

export const actionTypes = {
  VIEW_EDITOR_SHOW_FILE: '[View Editor] Show selected file',
  VIEW_EDITOR_DIRECTORY_EMPTIED: '[View Editor] Directory emptied'
};

export const viewEditorShowFile = createAction(
  actionTypes.VIEW_EDITOR_SHOW_FILE,
  props<{}>(),
);

export const viewEditorDirectoryEmptied = createAction(
  actionTypes.VIEW_EDITOR_DIRECTORY_EMPTIED,
  props<{}>(),
);
