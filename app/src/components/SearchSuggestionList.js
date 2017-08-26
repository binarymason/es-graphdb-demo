import React, {PropTypes} from 'react';

const SearchSuggestionList = ({suggestions}) => {
  return (
    <div>
      {suggestions.map((suggestion, index) => 
        <div key={index}>
          { suggestion._source.title }
        </div>
      )}
    </div>
  );
};

SearchSuggestionList.propTypes = {
  suggestions: PropTypes.array.isRequired
};

export default SearchSuggestionList;
