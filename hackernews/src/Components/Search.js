import React, { Component } from 'react';
import Button from './Button';
import PropTypes from 'prop-types';

class Search extends Component {
  componentDidMount() {
    if(this.input) {
      this.input.focus()
    }
  }
  render() {
    const { 
      value, 
      onChange, 
      children,
      onSubmit
    } = this.props;
    return (
      <>
        <form onSubmit={onSubmit}>
            {children} <input
              type="text"
              value={value}
              onChange={onChange}
              ref={(node) => {this.input = node;}}
            />
            <Button type="submit" onClick={onSubmit}>
              {children}
            </Button>
        </form>
      </>
    )
  }
}

Search.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  children: PropTypes.string,
  onSubmit: PropTypes.func
}

export default Search;
