import './App.css'
import Navbar from './Navbar';
import RecipePopup from './RecipePopup';
import RecipeScrapingForm from './RecipeScrapingForm';
import { useState } from 'react';

export default function App() {
  const [openingPopup, setOpeningPopup] = useState(false);
  const [recipe, setRecipe] = useState(null);

  function openRecipePopup(res){
    setRecipe(res);
    setOpeningPopup(true);
  }

  function onRecipePopupClose(){
    setRecipe(null);
  }

  return (
    <div className="App">
      <div className="container">
        <Navbar />
        {recipe && <RecipePopup 
          recipe={recipe} 
          isOpening={openingPopup} 
          setIsOpening={setOpeningPopup} 
          onClose={onRecipePopupClose}
        />}
        <main>
          <div id="rsf-wrapper">
            <p id="main-msg">Meal prepping your favorite recipes just got easier.</p>
            <RecipeScrapingForm handleResponse={openRecipePopup} />
          </div>
        </main>
      </div>
    </div>
  );
}
