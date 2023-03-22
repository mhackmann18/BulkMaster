import './App.css'
import Navbar from './Navbar';
import PopupWindow from './PopupWindow';
import TextInput from './TextInput';
import ErrorMsg from './ErrorMsg';
import Button from './Button';
import { useState } from 'react';

export default function App() {
  const [openingPopup, setOpeningPopup] = useState(false);
  const [urlInputErr, setURLInputErr] = useState({ isShowing: false, msg: '' });
  
  function handleRecipeURLSubmit() {
    setURLInputErr({ isShowing: true, msg: 'Please paste a valid recipe URL' });
  }

  return (
    <div className="App">
      <div className="container">
        <Navbar />
        <PopupWindow isOpening={openingPopup} setIsOpening={setOpeningPopup} />
        <main>
          <div>
            <p id='main-msg'>Meal prepping on a bulk just got easier.</p>
            <TextInput />
            <ErrorMsg isShowing={urlInputErr.isShowing} msg={urlInputErr.msg} />
            <Button text='Get Recipe' onClick={handleRecipeURLSubmit} />
          </div>
        </main>
      </div>
    </div>
  );
}

function isValidHttpUrl(string) {
  // https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}
