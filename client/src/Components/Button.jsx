import React from 'react';

const Button = ({ text, style, handleClick }) => {
  return (
    <button onClick={handleClick} style={style}>
      {text}
    </button>
  );
};

export default Button;
