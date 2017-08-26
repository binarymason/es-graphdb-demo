import * as types from '../actions/action-types';

const INITIAL_STATE = {
  query: '',
  suggestions: [],
  suggestionBrowsingIndex: 0,
  selectedMovie: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FETCH_SEARCH_SUGGESTIONS:
      return {
        ...state,
        query: action.query,
      };
    case types.RECEIVE_SEARCH_SUGGESTIONS:

      return {
        ...state,
        suggestions: action.suggestions,
        suggestionBrowsingIndex: 0,
      }
    case types.BROWSE_SEARCH_SUGGESTION:
      return {
        ...state,
        suggestionBrowsingIndex: state.suggestionBrowsingIndex + action.indexDelta
      }
    case types.SELECT_SEARCH_SUGGESTION:
      return {
        ...state,
        selectedMovie: state.suggestions[action.index],
        query: '',
        suggestions: [],
      }
    default:
      return state;
  }
};
