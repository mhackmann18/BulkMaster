import { useState } from "react";
import RecipeItem from "../components/RecipeItem";
import PopupWindow from "../components/common/PopupWindow";
import Recipe from "../components/Recipe";
import "./Library.css";
import data from "../assets/data.json";

export default function Library() {
  const [openingRecipePopup, setOpeningRecipePopup] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const recipes = data;

  return (
    <div id="library-page-content">
      {recipes.map((recipe) => (
        <RecipeItem
          key={recipe.id}
          recipeTitle={recipe.title}
          recipeServings={recipe.servings}
          caloriesPerRecipeServing={recipe.nutrients.calories.quantity}
          handleClick={() => {
            setCurrentRecipe(recipe);
            setOpeningRecipePopup(true);
          }}
        />
      ))}
      {currentRecipe && (
        <PopupWindow
          isOpening={openingRecipePopup}
          setIsOpening={setOpeningRecipePopup}
          onClose={() => setCurrentRecipe(null)}
        >
          <Recipe recipe={currentRecipe} />
        </PopupWindow>
      )}
    </div>
  );
}
