import React from 'react';

function Button({ onClick }) {
  return (
    <button type="button" onClick={onClick}>
      load more
    </button>
  );
}

export default Button;
