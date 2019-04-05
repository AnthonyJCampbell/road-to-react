import React from 'react';
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

const Table = ({ list, onDismiss, onSort, sortKey, isSortReverse }) => {
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
                onSort={onSort}
                activeSortKey={sortKey}
                >
                Title
              </Sort>
            </span>
            <span style={{ width: '30%' }}>
              <Sort
                sortKey='AUTHOR'
                activeSortKey={sortKey}
                onSort={onSort}>
                Author
              </Sort>
            </span>
            <span style={{ width: '10%' }}>
              <Sort
                sortKey='COMMENTS'
                activeSortKey={sortKey}
                onSort={onSort}>
                Comments
              </Sort>
            </span>
            <span style={{ width: '10%' }}>
              <Sort
                sortKey='POINTS'
                activeSortKey={sortKey}
                onSort={onSort}>
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
