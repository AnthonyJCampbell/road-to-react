import React, { Component } from 'react';

// Components
import Search from './Components/Search';
import Table from './Components/Table';

// Stlying
import './App.css'

// API REQUEST SET-UP
const DEFAULT_QUERY = 'redux';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY
    }
  }

  onDismiss = (id) => {
    const isNotID = item => item.objectID !== id;
    const updatedList = this.state.list.filter(isNotID)
    this.setState({ list: updatedList })
  }

  onSearchChange = (e) => {
    this.setState({
      searchTerm: e.target.value
    })
  }

  setSearchTopStories = result => {
    this.setState({ result})
  }

  // LIFECYLCE METHODS

  componentDidMount() {
    const { searchTerm } = this.state;
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}}`)
      .then(res => res.json())
      .then(res => this.setSearchTopStories(res))
      .catch(err => err)
  }

  render() {
    const { searchTerm, result } = this.state;
    if (!result) { return null; }
    return (
      <div className="page">
        <div className="interactions">
          <Search className="interactions"
            value={searchTerm}
            onChange={this.onSearchChange}
          >
            Search
          </Search>
        </div>
        <Table 
          list={result.hits}
          pattern={searchTerm}
          onDismiss={this.onDismiss}
        />
      </div>
    );
  }
}

export default App;
