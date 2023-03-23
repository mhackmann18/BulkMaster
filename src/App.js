import './App.css'
import Navbar from './Navbar';
import PopupWindow from './PopupWindow';
import ScrapeRecipeForm from './ScrapeRecipeForm';
import { useState } from 'react';

export default function App() {
  const [openingPopup, setOpeningPopup] = useState(false);
  
  return (
    <div className="App">
      <div className="container">
        <Navbar />
        <PopupWindow isOpening={openingPopup} setIsOpening={setOpeningPopup} />
        <main>
          <ScrapeRecipeForm />
        </main>
      </div>
    </div>
  );
}
