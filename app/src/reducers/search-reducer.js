import * as types from '../actions/action-types';

const INITIAL_STATE = {
  query: '',
  suggestions: [],
  suggestionBrowsingIndex: 0,
  selectedMovie: null,
  gender: null,
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
        suggestionBrowsingIndex: action.index,
      }
    case types.SELECT_SEARCH_SUGGESTION:
      return {
        ...state,
        selectedMovie: action.selection,
        query: '',
        suggestions: [],
      }
    case types.RECEIVE_GOOGLE_IMAGE:
      return {
        ...state,
        selectedMovie: {
          ...state.selectedMovie,
          _source: { ...state.selectedMovie._source, img: action.img, }
        }
      }
    case types.GENDER_CHANGE:
      return {
        ...state,
        gender: action.gender,
      }
    case types.RECEIVE_RELATED_MOVIES:
      return {
        ...state,
        relatedMovies: action.relatedMovies,
      }
    default:
      return state;
  }
};
