import { useState } from "react";
import RecipeScrapingForm from "../components/common/RecipeScrapingForm";
import Recipe from "../components/Recipe";
import "./Import.css";

export default function Import() {
  const [recipe, setRecipe] = useState(null);

  return (
    <div id="import-page">
      {recipe ? (
        <Recipe
          recipe={recipe}
          startingDisplayType="div"
          setRecipe={setRecipe}
        />
      ) : (
        <RecipeScrapingForm
          variant={recipe && "inline"}
          handleResponse={(res) => {
            setRecipe(res);
          }}
        />
      )}
    </div>
  );
}
