import './App.css'
import Navbar from './Navbar';
import PopupWindow from './PopupWindow';
import RecipeScrapingForm from './RecipeScrapingForm';
import { useState } from 'react';

export default function App() {
  const [openingPopup, setOpeningPopup] = useState(false);
  
  return (
    <div className="App">
      <div className="container">
        <Navbar />
        <PopupWindow isOpening={openingPopup} setIsOpening={setOpeningPopup} />
        <main>
          <div id="rsf-wrapper">
            <p id="main-msg">Meal prepping your favorite recipes just got easier.</p>
            <RecipeScrapingForm />
          </div>
        </main>
      </div>
    </div>
  );
}
