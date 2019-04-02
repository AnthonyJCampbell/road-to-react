import React from 'react';
import Button from './Button';
import PropTypes from 'prop-types';

const Search = ({ 
    value, 
    onChange, 
    children,
    onSubmit
  }) => {
  return (
    <>
      <form onSubmit={onSubmit}>
          {children} <input
            type="text"
            value={value}
            onChange={onChange}
          />
          <Button type="submit" onClick={onSubmit}>
            {children}
          </Button>
      </form>
    </>
  );
}

Search.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.string,
  onSubmit: PropTypes.func.isRequired
}

export default Search;
