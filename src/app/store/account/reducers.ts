import { createReducer, on } from '@ngrx/store';
import {
  avatarChanged,
  basicInfoChanged,
  profileChanged,
} from './actions';
import deepcopy from 'deepcopy';

const reducers = createReducer(null,
  on(avatarChanged, (state, action) => deepcopy(action)),
  on(profileChanged, (state, action) => deepcopy(action)),
  on(basicInfoChanged, (state, action) => deepcopy(action)),
);

export function accountReducer(state, action) {
  return reducers(state, action);
}
