import React, { Component } from 'react';

// Components
import Search from './Components/Search';
import Table from './Components/Table';
import Button from './Components/Button';

// Stlying
import './App.css'

// API REQUEST SET-UP
const DEFAULT_QUERY = 'redux';
const DEFAULT_HPP = '100';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

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
    const updatedHits = this.state.result.hits.filter(isNotID)
    this.setState({ 
      result: {...this.state.results, hits: updatedHits}
    })
  }

  onSearchChange = (e) => {
    this.setState({
      searchTerm: e.target.value
    })
  }

  setSearchTopStories = result => {
    const { hits, page } = result;
    // Returns the previous list of hits, stored in state (before the new one get passed), if we're on page > 1. Else, just return an empty array.
    const oldHits = page !== 0 ? this.state.result.hits : [];
    const updatedHits = [...oldHits, ...hits]
    this.setState({ 
      result: { hits: updatedHits, page}
    })
  }

  fetchSearchTopStories = (searchTerm, page = 0) => {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(res => res.json())
      .then(res => this.setSearchTopStories(res))
      .catch(err => err)
  }

  onSearchSubmit = (e) => {
    const { searchTerm } = this.state
    this.fetchSearchTopStories(searchTerm)
    e.preventDefault();
  }

  // LIFECYLCE METHODS

  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm)
  }

  render() {
    const { searchTerm, result } = this.state;
    const page = (result && result.page) || 0;
    return (
      <div className="page">
        <div className="interactions">
          <Search className="interactions"
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            Search
          </Search>
        </div>
        {result &&
          <Table 
            list={result.hits}
            onDismiss={this.onDismiss}
          />
        }
        <div className="interactions">
          <Button onClick={() => this.fetchSearchTopStories(searchTerm, page+1)} >
            More
          </Button>
        </div>
      </div>
    );
  }
}

export default App;
