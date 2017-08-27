import React from 'react';
import PropTypes from 'prop-types'
import './styles.css';

const SearchSuggestionList = (props) => {
  const {
    suggestions,
    suggestionBrowsingIndex,
    browseSearchSuggestion,
    selectSearchSuggestion
  } = props;

  return (
    <div>
      {suggestions.map((suggestion, index) =>
        <div
          key={suggestion._id}
          className={index === suggestionBrowsingIndex ? 'selected' : 'notselected'}
          onMouseOver={() => browseSearchSuggestion(index)}
          onClick={() => selectSearchSuggestion(index)}
        >
          { suggestion._source.title }
        </div>
      )}
    </div>
  );
};

SearchSuggestionList.propTypes = {
  props: PropTypes.shape({
    suggestions: PropTypes.array.isRequired,
    suggestionBrowsingIndex: PropTypes.number.isRequired,
    browseSearchSuggestion: PropTypes.func.isRequired,
    selectSearchSuggestion: PropTypes.func.isRequired,
  })
};

export default SearchSuggestionList;
