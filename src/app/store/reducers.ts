import { createReducer, on } from '@ngrx/store';
import { textBlockMenuClicked, textBlockCreated, textBlockRemoved, actionTypes } from './actions';
import deepcopy from 'deepcopy';

const reactToMenuReducer = createReducer(null,
  on(textBlockMenuClicked, state => {
    return deepcopy({type: actionTypes.ADD_TEXT_BLOCK});
  }),
);

const textBlockActionsReducer = createReducer(null,
  on(textBlockCreated, (state, textBlockAction) => deepcopy(textBlockAction)),
  on(textBlockRemoved, (state, textBlockAction) => deepcopy(textBlockAction)),
);

export function menuReducer(state, action) {
  return reactToMenuReducer(state, action);
}

export function textBlockReducer(state, action) {
  return textBlockActionsReducer(state, action);
}
