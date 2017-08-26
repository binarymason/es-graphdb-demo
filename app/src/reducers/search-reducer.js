import * as types from '../actions/action-types';

const INITIAL_STATE = {
  query: '',
  suggestions: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.ADD_SEARCH_INPUT:
      return {
        ...state,
        query: action.query,
      };
    case types.RECEIVE_SEARCH_SUGGESTIONS:
      return {
        ...state,
        suggestions: action.suggestions,
      }
    default:
      return state;
  }
};
