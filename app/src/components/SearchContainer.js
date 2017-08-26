import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as searchActions from '../actions/search-actions';
import SearchInput from './SearchInput';
import Movie from './Movie';

class SearchContainer extends Component {
  // constructor(props) {
  //   super(props);
  //
  //   this.state = {
  //     people: []
  //   };
  // }

  render() {
    const selectedMovie = this.props.selectedMovie;

    return (
      <div>
        <p className="App-intro">
          To get started, find a movie that you like (1998 and earlier).
        </p>
        { selectedMovie && <Movie {...selectedMovie._source} /> }
        <SearchInput
          fetchSearchSuggestions={this.props.actions.fetchSearchSuggestions}
          browseSearchSuggestion={this.props.actions.browseSearchSuggestion}
          selectSearchSuggestion={this.props.actions.selectSearchSuggestion}
          suggestions={this.props.suggestions}
          suggestionBrowsingIndex={this.props.suggestionBrowsingIndex}
          query={this.props.query}
        />
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
