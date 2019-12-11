import {createAction, props} from '@ngrx/store';

export const actionTypes = {
  HTTP_CREATE_PRESENTATION: '[Http] Create presentation',
  HTTP_CREATE_PRESENTATION_FINISHED: '[Http] Create presentation finished',
};

export const httpCreatePresentation = createAction(
  actionTypes.HTTP_CREATE_PRESENTATION,
  props<{}>()
);

export const httpCreatePresentationFinished = createAction(
  actionTypes.HTTP_CREATE_PRESENTATION_FINISHED
);
