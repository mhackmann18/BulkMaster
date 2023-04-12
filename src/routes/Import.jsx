import { useState } from "react";
import RecipeScrapingForm from "../components/common/RecipeScrapingForm";
import Recipe from "../components/Recipe/RecipeDisplay";
// import RecipeForm from "../RecipeForm";
import "./Import.css";

export default function Import() {
  const [recipe, setRecipe] = useState(null);

  return (
    <div id="import-page-content">
      {recipe ? (
        <Recipe recipe={recipe} />
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
