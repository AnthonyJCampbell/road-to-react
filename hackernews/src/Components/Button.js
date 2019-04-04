import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ onClick, className = '', children}) => {
  return (
    <button
      onClick={onClick}
      className={className}
      type="button"
    >
      {children}
    </button>
  );
}

const Loading = () => <div><h2>Loading...</h2></div>
const withLoading = (Component) => ({ isLoading, ...rest}) => isLoading ? <Loading/> : <Component {...rest} />
export const ButtonWithLoading = withLoading(Button)
Button.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
}

export default Button