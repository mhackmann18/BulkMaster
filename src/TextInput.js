import './TextInput.css'
import { useState } from 'react';
import { useEffect } from 'react';

export default function TextInput({ processInputFlag, setProcessInputFlag, processInput }) {

  const [input, setInput] = useState('');

  useEffect(() => {
    if(processInputFlag){
      setProcessInputFlag(false);
      processInput(input);
    }
  });

  function handleChange(e) {
    setInput(e.target.value);
  }

  return <input onChange={handleChange} type="text" id="url-input" placeholder="Paste a recipe's URL"/>;
}
