import { useState } from "react";
import RecipeScrapingForm from "../common/RecipeScrapingForm";
import PopupWindow from "../common/PopupWindow";
import Recipe from "../Recipe";
import "./Import.css";

export default function Import() {
  const [openingPopup, setOpeningPopup] = useState(false);
  const [recipe, setRecipe] = useState(null);

  return (
    <div id="import-page-content">
      <RecipeScrapingForm
        handleResponse={(res) => {
          setRecipe(res);
          setOpeningPopup(true);
        }}
      />
      {recipe && (
        <PopupWindow
          isOpening={openingPopup}
          setIsOpening={setOpeningPopup}
          onClose={() => setRecipe(null)}
        >
          <Recipe recipe={recipe} />
        </PopupWindow>
      )}
    </div>
  );
}
