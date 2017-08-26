import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as searchActions from '../actions/search-actions';
import SearchInput from './SearchInput';

class SearchContainer extends Component {
  // constructor(props) {
  //   super(props);
  //
  //   this.state = {
  //     people: []
  //   };
  // }

  render() {
    return (
      <div>
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
