import {createAction, props} from '@ngrx/store';

export const actionTypes = {
  VIEW_PRESENTATION_CREATE: '[View] Presentation create',
};

export const viewCreatePresentation = createAction(
  actionTypes.VIEW_PRESENTATION_CREATE,
  props<{}>(),
);
