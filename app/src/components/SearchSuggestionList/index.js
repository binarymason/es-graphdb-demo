import React, {PropTypes} from 'react';
import './styles.css';

const SearchSuggestionList = ({suggestions, suggestionBrowsingIndex}) => {
  return (
    <div>
      {suggestions.map((suggestion, index) =>
        <div key={suggestion._id} className={index === suggestionBrowsingIndex ? 'selected' : 'notselected'}>
          { suggestion._source.title }
        </div>
      )}
    </div>
  );
};

SearchSuggestionList.propTypes = {
  suggestions: PropTypes.array.isRequired,
  suggestionBrowsingIndex: PropTypes.number.isRequired,
};

export default SearchSuggestionList;
