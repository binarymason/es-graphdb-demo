import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchContainer from './components/SearchContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Movie Recommender</h2>
        </div>
        <SearchContainer />
      </div>
    );
  }
}

export default App;
