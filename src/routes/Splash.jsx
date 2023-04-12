import { useState } from "react";
import disableInputScroll from "../utils/disableInputScroll";
import Navbar from "../components/Navbar";
import Recipe from "../components/Recipe";
import PopupWindow from "../components/common/PopupWindow";
import RecipeScrapingForm from "../components/common/RecipeScrapingForm";
import "./Splash.css";

export default function Splash() {
  const [openingPopup, setOpeningPopup] = useState(false);
  const [recipe, setRecipe] = useState(null);

  disableInputScroll();

  return (
    <div className="justify-content">
      <div className="content-width">
        <Navbar />
        {recipe && (
          <PopupWindow
            isOpening={openingPopup}
            setIsOpening={setOpeningPopup}
            onClose={() => setRecipe(null)}
          >
            <Recipe recipe={recipe} />
          </PopupWindow>
        )}
        <main>
          <div id="rsf-wrapper">
            <p id="main-msg">
              Meal prepping your favorite recipes just got easier.
            </p>
            <RecipeScrapingForm
              handleResponse={(res) => {
                setRecipe(res);
                setOpeningPopup(true);
              }}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
