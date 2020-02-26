import {createAction, props} from "@ngrx/store";

const actionTypes = {
  CLEAR_STATE: '[GLOBAL] Clear state',
};

export const clearStateAction = createAction(
  actionTypes.CLEAR_STATE,
);

export function clearState(reducer) {
  return function (state, action) {
    if (action.type === actionTypes.CLEAR_STATE) {
      state = undefined;
    }

    return reducer(state, action);
  };
}
