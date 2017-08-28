import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as searchActions from '../actions/search-actions';
import SearchInput from './SearchInput';
import Movie from './Movie';


class SearchContainer extends Component {
  constructor(props) {
    super(props);

    this.handleGenderChange = this.handleGenderChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleGenderChange(e) {
    const gender = e.target.value;
    if (! ['m', 'f'].includes(gender)) return;
    this.props.actions.genderChange(gender);
  }

  handleButtonClick() {
    const { selectedMovie, gender } = this.props;
    if (!gender) return alert('select a gender first');
    if (!selectedMovie) return alert('select a movie first');

    const movieTitle = selectedMovie._source.title;
    this.props.actions.performRelatedMovieSearch({gender, movieTitle})
  }

  render() {
    const selectedMovie = this.props.selectedMovie;

    return (
      <div>
        <p className="App-intro">Search for a movie (1998 and earlier).</p>
        <SearchInput
          fetchSearchSuggestions={this.props.actions.fetchSearchSuggestions}
          browseSearchSuggestion={this.props.actions.browseSearchSuggestion}
          selectSearchSuggestion={this.props.actions.selectSearchSuggestion}
          suggestions={this.props.suggestions}
          suggestionBrowsingIndex={this.props.suggestionBrowsingIndex}
          query={this.props.query}
        />
        <br />
        { selectedMovie && <Movie {...selectedMovie._source } /> }
      </div>
    );
  }
}

SearchContainer.propTypes = {
  suggestions: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  query: PropTypes.string.isRequired,
  suggestionBrowsingIndex: PropTypes.number,
};

function mapStateToProps(state, props) {
  return {
    ...state.search
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(searchActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
