import { useState } from "react";
import Recipe from "../components/Recipe";
// import RecipeForm from "../components/Recipe/Form";
// import RecipeDisplay from "../components/Recipe/Display";
import PopupWindow from "../components/common/PopupWindow";
import RecipeScrapingForm from "../components/common/RecipeScrapingForm";
import "./Home.css";

export default function Home() {
  const [openingPopup, setOpeningPopup] = useState(false);
  const [recipe, setRecipe] = useState(null);

  return (
    <>
      {recipe && (
        <PopupWindow
          isOpening={openingPopup}
          setIsOpening={setOpeningPopup}
          onClose={() => setRecipe(null)}
        >
          <Recipe recipe={recipe} startingDisplayType="div" />
        </PopupWindow>
      )}
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
    </>
  );
}
