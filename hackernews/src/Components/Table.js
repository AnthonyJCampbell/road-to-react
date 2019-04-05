import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { sortBy } from 'lodash';

// Components
import Button from './Button'

const largeColumn = {
  width: '40%',
}
const mediumColumn = {
  width: '30%',
}
const smallColumn = {
  width: '10%',
}

const SORTS = {
  NONE: list => list,
  TITLE: list => sortBy(list, 'title'),
  AUTHOR: list => sortBy(list, 'author'),
  COMMENTS: list => sortBy(list, 'num_comments').reverse(),
  POINTS: list => sortBy(list, 'points').reverse(),
}

class Table extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sortKey: 'NONE',
      isSortReverse: false
    }
  }

  onSort = (sortKey) => {
    const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse
    this.setState({ sortKey, isSortReverse })
  }

  render() {
    const {list, onDismiss} = this.props;
    const {sortKey, isSortReverse} = this.state
    const sortedList = SORTS[sortKey](list)
    const reverseSortedList = isSortReverse 
      ? sortedList.reverse() 
      : sortedList
    
      return (
        <div className="table">
              <div className="table-header">
                <span style={{ width: '40%' }}>
                  <Sort
                    sortKey='TITLE'
                    onSort={this.onSort}
                    activeSortKey={sortKey}
                    >
                    Title
                  </Sort>
                </span>
                <span style={{ width: '30%' }}>
                  <Sort 
                    sortKey='AUTHOR'
                    activeSortKey={sortKey}
                    onSort={this.onSort}>
                    Author
                  </Sort>
                </span>
                <span style={{ width: '10%' }}>
                  <Sort
                    sortKey='COMMENTS'
                    activeSortKey={sortKey}
                    onSort={this.onSort}>
                    Comments
                  </Sort>
                </span>
                <span style={{ width: '10%' }}>
                  <Sort
                    sortKey='POINTS'
                    activeSortKey={sortKey}
                    onSort={this.onSort}>
                    Points
                  </Sort>
                </span>
                <span style={{ width: '10%'}}>
                  Archive
                </span>
              </div>
            {reverseSortedList.map(item => 
              {if(item.title) {
                return (
                  <div 
                    className="table-row"
                    key={item.objectID}  
                    >
                    <span style={largeColumn}>
                      <a href={item.url}>{item.title}</a>
                    </span>
                    <span style={mediumColumn}>{item.author}</span>
                    <span style={smallColumn}>{item.num_comments}</span>
                    <span style={smallColumn}>{item.points}</span>
      
                    <span style={smallColumn}>
                      <Button 
                        className="button-inline"
                        onClick={() => onDismiss(item.objectID)}>
                        Dismiss
                      </Button>
                    </span>
                  </div>
                )
              }}
            )}
        </div>
      );
  }
}
const Sort = ({ sortKey, onSort, children, activeSortKey }) => {
  const sortClass = ['button-inline'];

  if (sortKey === activeSortKey) {
    sortClass.push('button-active')
  }
  return (
    <Button onClick={() => onSort(sortKey)} 
      className={sortClass.join(' ')}>
      {children}
    </Button>
  )
}

Table.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      objectID: PropTypes.string.isRequired,
      author: PropTypes.string,
      url: PropTypes.string,
      num_comments: PropTypes.number,
      points: PropTypes.number
    })
  ).isRequired,
  onDismiss: PropTypes.func.isRequired
}

export default Table;
