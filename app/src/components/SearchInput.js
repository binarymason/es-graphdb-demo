import React, {PropTypes, Component} from 'react';

class SearchInput extends Component {
  constructor(props) {
    super(props);

    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(e) {
    const query = e.target.value;
    this.props.fetchSearchSuggestions({ query });
  }

  componentDidMount() {
    document.getElementById('search').focus();
  }

  render() {
    return (
      <div>
        <input id="search" type="text" placeholder="Search for a movie" onKeyUp={this.handleInput}/>
      </div>
    );
  }
}

SearchInput.propTypes = {
  fetchSearchSuggestions: PropTypes.func.isRequired
};

export default SearchInput;
