import {createAction, props} from '@ngrx/store';

export const actionTypes = {
  GLOBAL_CLIENT_ERROR: '[Http] Global client error',
  GLOBAL_SERVER_ERROR: '[Http] Global server error',
};

export const globalClientError = createAction(
  actionTypes.GLOBAL_CLIENT_ERROR,
  props<{}>()
);

export const globalServerError = createAction(
  actionTypes.GLOBAL_SERVER_ERROR,
  props<{}>()
);
