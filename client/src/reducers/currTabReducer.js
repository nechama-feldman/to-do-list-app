import { SHOW_ALL, TOGGLE_TAB } from '../actions/types';

const currTabReducer = (state = SHOW_ALL, action) => {
  switch (action.type) {
    case TOGGLE_TAB:
      return action.filter;
    default:
      return state;
  }
};

export default currTabReducer;
