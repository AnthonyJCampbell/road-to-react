import React, { Component } from 'react';

// Components
import Search from './Components/Search';
import Table from './Components/Table';


class App extends Component {
  constructor(props) {
    super(props);

    const list = [
      {
        title: 'React',
        url: 'https://facebook.github.io/react',
        author: 'Jordan Walke',
        num_comments: 3,
        points: 4,
        objectID: 0,
      },
      {
        title: 'Redux',
        url: 'https://github.com/reactjs/redux',
        author: 'Dan Abramov, Andrew Clark',
        num_comments: 2,
        points: 5,
        objectID: 1,
      },
    ];
    this.state = {
      list,
      searchTerm: '',
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

  render() {
    const { searchTerm, list } = this.state;
    return (
      <div className="App">
        <Search
          value={searchTerm}
          onChange={this.onSearchChange}
        />
        <Table 
          list={list}
          pattern={searchTerm}
          onDismiss={this.onDismiss}
        />
      </div>
    );
  }
}

export default App;
