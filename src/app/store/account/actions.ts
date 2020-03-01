import {createAction, props} from '@ngrx/store';

export const actionTypes = {
  AVATAR_CHANGED: '[Http] Avatar changed',
  PROFILE_CHANGED: '[Http] Profile changed',
  BASIC_INFO_CHANGED: '[Http] Basic info changed',
};

export const avatarChanged = createAction(
  actionTypes.AVATAR_CHANGED,
);

export const profileChanged = createAction(
  actionTypes.PROFILE_CHANGED,
  props<{}>()
);

export const basicInfoChanged = createAction(
  actionTypes.BASIC_INFO_CHANGED,
  props<{}>()
);
