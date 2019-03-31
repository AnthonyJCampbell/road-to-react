import React from 'react';
import Button from './Button'

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
          <Button type="submit">
            {children}
          </Button>
      </form>
    </>
  );
}

export default Search;
