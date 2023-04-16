import { useState } from "react";
import disableInputScroll from "../utils/disableInputScroll";
import Recipe from "../components/Recipe";
import PopupWindow from "../components/common/PopupWindow";
import RecipeScrapingForm from "../components/common/RecipeScrapingForm";
import "./Splash.css";

export default function Home() {
  const [openingPopup, setOpeningPopup] = useState(false);
  const [recipe, setRecipe] = useState(null);

  disableInputScroll();

  return (
    <>
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
    </>
  );
}
