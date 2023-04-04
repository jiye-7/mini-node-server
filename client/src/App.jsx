import { useState } from 'react';

import Button from './Components/Button';
import { wordChange } from './api/wordChange';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [word, setWord] = useState('');

  const handleInputUpdate = ({ target }) => {
    setInputValue(target.value);
  };

  const handleToUpperCase = () => {
    setInputValue('');
    handleWordChangeRequest('upper');
  };

  const handleToLowerCase = () => {
    setInputValue('');
    handleWordChangeRequest('lower');
  };

  const handleWordChangeRequest = (path) => {
    wordChange(path, {
      method: 'POST',
      body: JSON.stringify({ text: inputValue }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((data) => {
      setWord(data.text);
    });
  };

  return (
    <div className='Container'>
      <h2>요청</h2>
      <div className='app'>
        <textarea
          type='text'
          style={InputStyle}
          value={inputValue}
          placeholder='여기에 작성한 데이터를 서버로 보내면 응답으로 받을 수 있어야 합니다.'
          onChange={handleInputUpdate}
        />
        <Button
          text='toUpperCase'
          style={upperButtonStyle}
          handleClick={handleToUpperCase}
        />
        <Button
          text='toLoserCase'
          style={lowerButtonStyle}
          handleClick={handleToLowerCase}
        />
      </div>
      <h2>응답</h2>
      <pre className='response-area'>{word}</pre>
    </div>
  );
}

export default App;

const InputStyle = {
  marginRight: '1rem',
  width: '50%',
  borderRadius: '5px',
};

const upperButtonStyle = {
  backgroundColor: '#BA90C6',
  marginRight: '0.5rem',
};

const lowerButtonStyle = {
  backgroundColor: '#FFD93D',
};
