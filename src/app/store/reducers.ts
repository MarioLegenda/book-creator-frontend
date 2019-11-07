import { createReducer, on } from '@ngrx/store';
import { addTextBlock } from './actions';

export const actionTypes = {
  ADD_TEXT_BLOCK: 'add_text_block'
};

const reactToMenuReducer = createReducer(null,
  on(addTextBlock, state => {
    return {type: actionTypes.ADD_TEXT_BLOCK};
  }),
);

export function menuReducer(state, action) {
  return reactToMenuReducer(state, action);
}
