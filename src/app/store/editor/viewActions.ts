import {createAction, props} from '@ngrx/store';

export const actionTypes = {
  VIEW_EDITOR_SHOW_FILE: '[View Editor] Show selected file',
};

export const viewEditorShowFile = createAction(
  actionTypes.VIEW_EDITOR_SHOW_FILE,
  props<{}>(),
);
