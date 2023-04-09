import { useState } from "react";
import RecipeScrapingForm from "../common/RecipeScrapingForm";
// import Recipe from "../Recipe";
import RecipeForm from "../RecipeForm";
import "./Import.css";

export default function Import() {
  const [recipe, setRecipe] = useState(null);

  return (
    <div id="import-page-content">
      {recipe ? (
        <RecipeForm recipe={recipe} />
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
