import { useState } from 'react';
import Navbar from './Navbar';
import RecipePopup from './RecipePopup';
import RecipeScrapingForm from './RecipeScrapingForm';
import './App.css';

export default function App() {
  const [openingPopup, setOpeningPopup] = useState(false);
  const [recipe, setRecipe] = useState(null);

  return (
    <div className="App">
      <div className="content-width">
        <Navbar />
        {recipe && <RecipePopup 
          recipe={recipe} 
          isOpening={openingPopup} 
          setIsOpening={setOpeningPopup} 
          onClose={() => setRecipe(null)}
        />}
        <main>
          <div id="rsf-wrapper">
            <p id="main-msg">Meal prepping your favorite recipes just got easier.</p>
            <RecipeScrapingForm handleResponse={res => { setRecipe(res); setOpeningPopup(true)}} />
          </div>
        </main>
      </div>
    </div>
  );
}
