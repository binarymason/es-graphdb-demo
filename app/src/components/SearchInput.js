import React, {PropTypes, Component} from 'react';
import SearchSuggestionList from './SearchSuggestionList';

const AUTHORIZED_NON_NUMERICS = ['Backspace', 'ArrowDown', 'ArrowUp', 'Enter']

class SearchInput extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  isAllowedKey(e) {
    if (AUTHORIZED_NON_NUMERICS.includes(e.key)) return true
    return /[a-z0-9]/i.test(e.keyCode);
  }

  handleKeyDown(e) {
    if (!this.isAllowedKey(e)) return;

    const currentIndex = this.props.suggestionBrowsingIndex;

    switch (e.key) {
      case 'ArrowDown':
        return this.props.browseSearchSuggestion(currentIndex + 1)
      case 'ArrowUp':
        return this.props.browseSearchSuggestion(currentIndex -1)
      case 'Enter':
        return this.props.selectSearchSuggestion(currentIndex)
      default:
    }
  }

  handleChange(e) {
    this.props.fetchSearchSuggestions({ query: e.target.value });
  }

  componentDidMount() {
    document.getElementById('search').focus();
  }

  render() {
    return (
      <div>
        <input id="search" type="text" value={this.props.query} placeholder="Search for a movie" onChange={this.handleChange} onKeyDown={this.handleKeyDown}/>
        <SearchSuggestionList
          suggestions={this.props.suggestions}
          suggestionBrowsingIndex={this.props.suggestionBrowsingIndex}
          browseSearchSuggestion={this.props.browseSearchSuggestion}
          selectSearchSuggestion={this.props.selectSearchSuggestion}
        />
      </div>
    );
  }
}

SearchInput.propTypes = {
  fetchSearchSuggestions: PropTypes.func.isRequired,
  browseSearchSuggestion: PropTypes.func.isRequired,
  selectSearchSuggestion: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  suggestions: PropTypes.array.isRequired,
  suggestionBrowsingIndex: PropTypes.number.isRequired,
};

export default SearchInput;
