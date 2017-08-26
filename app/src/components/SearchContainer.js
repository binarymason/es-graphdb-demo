import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as searchActions from '../actions/search-actions';
import SearchSuggestionList from './SearchSuggestionList';
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
        <SearchInput handleSearchInput={this.props.actions.handleSearchInput} />
        <SearchSuggestionList suggestions={this.props.suggestions} />
      </div>
    );
  }
}

SearchContainer.propTypes = {
  suggestions: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, props) {
  return {
    suggestions: state.search.suggestions,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(searchActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
