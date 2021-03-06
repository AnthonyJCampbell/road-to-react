import React, { Component } from 'react';
import axios from 'axios';

// Components
import Search from './Components/Search';
import Table from './Components/Table';
import { ButtonWithLoading} from './Components/Button';

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
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
      error: null,
      isLoading: false,
    }
  }

  onDismiss = (id) => {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];

    const isNotID = item => item.objectID !== id;
    const updatedHits = hits.filter(isNotID)
    this.setState({ 
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page}
      }
    })
  }

  onSearchChange = (e) => {
    this.setState({
      searchTerm: e.target.value
    })
  }

  setSearchTopStories = result => {
    const { hits, page } = result;
    this.setState(prevState => {
      const { searchKey, results } = prevState;
      const oldHits = results && results[searchKey] ? results[searchKey].hits : [];
      const updatedHits = [...oldHits, ...hits]
      return {
        results: {
          ...results,
          [searchKey]: {hits: updatedHits, page}
        },
        isLoading: false
      }
    })
  }

  fetchSearchTopStories = (searchTerm, page = 0) => {
    this.setState({isLoading: true})
    axios(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(result => this._isMounted && this.setSearchTopStories(result.data))
      .catch(error => this._isMounted && this.setState({error}))
  }

  onSearchSubmit = (e) => {
    const { searchTerm } = this.state
    this.setState({ searchKey: searchTerm})

    if(this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm);
    }
    e.preventDefault();
  }

  needsToSearchTopStories = (searchTerm) => {
    return !this.state.results[searchTerm]
  }


  // LIFECYLCE METHODS
  componentDidMount() {
    this._isMounted = true;
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm })
    this.fetchSearchTopStories(searchTerm)
  }

  render() {
    const { searchTerm, results, searchKey, error, isLoading } = this.state;
    const page = (results && results[searchKey] && results[searchKey].page) || 0;
    const list = ( results && results[searchKey] && results[searchKey].hits) || [];
    
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
          {error ? 
            <p>Something's gone wrong yo!</p>
          :
            <Table 
              list={list}
              onDismiss={this.onDismiss}
            />
          }
        <div className="interactions">
          <ButtonWithLoading 
            isLoading={isLoading}
            onClick={() => this.fetchSearchTopStories(searchKey, page+1)}>
              More
            </ButtonWithLoading>
        </div>
      </div>
    );
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
}

export default App;
