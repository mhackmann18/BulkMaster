import './App.css'
import Banner from './Banner';
import Button from './Button';
import URLInput from './URLInput';
import PopupWindow from './PopupWindow';
import { useState } from 'react';

function App() {
  const [openPopup, setOpenPopup] = useState(false);
  function fdsdfasd() {
    console.log('dsa');
    setOpenPopup(true);
  }
  console.log(openPopup);
  return (
    <div className="App">
      <div className="container">
        <Banner />
        <PopupWindow isOpening={openPopup} setIsOpening={setOpenPopup}/>
        <main>
          <div>
            <p>Meal prepping on a bulk<br></br> just got easier.</p>
            <URLInput />
            <Button text='Get Recipe' onClick={fdsdfasd}/>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
