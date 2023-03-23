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
  const [processInputFlag, setProcessInputFlag] = useState(false);

  async function getRecipeJSONFromURL(string) {
    if(!isValidHttpUrl(string)){
      setURLInputErr({ isShowing: true, msg: 'Please paste a valid recipe URL' });
      return false;
    } 
    
    let res = await fetch(`http://localhost:8000/recipe-data?url=${string}`);
    console.log(res);

    if(res.status === 200){
      setURLInputErr({ isShowing: false, msg: ' '});
      let data = await res.json();
      console.log(data);
    } else {
      setURLInputErr({ isShowing: true, msg: 'Something went wrong. Please try a different url' });
    }
  }

  return (
    <div className="App">
      <div className="container">
        <Navbar />
        <PopupWindow isOpening={openingPopup} setIsOpening={setOpeningPopup} />
        <main>
          <div>
            <p id='main-msg'>Meal prepping your favorite recipes just got easier.</p>
            <TextInput processInputFlag={processInputFlag} setProcessInputFlag={setProcessInputFlag} processInput={getRecipeJSONFromURL} />
            <ErrorMsg isShowing={urlInputErr.isShowing} msg={urlInputErr.msg} />
            <Button text='Get Recipe' onClick={setProcessInputFlag} />
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
