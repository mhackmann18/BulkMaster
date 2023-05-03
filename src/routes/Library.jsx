import LibraryItem from "../components/LibraryItem";
import data from "../assets/data.json";
import "./Library.css";
import { getNutrientQuantityFromArray } from "../utils/formatScrapedRecipe";

export default function Library() {
  const recipes = data;

  return (
    <div id="library-page">
      {recipes.map((recipe) => (
        <LibraryItem
          key={recipe.id}
          recipeTitle={recipe.title}
          recipeServings={recipe.servings}
          caloriesPerRecipeServing={getNutrientQuantityFromArray(
            "Calories",
            recipe.nutrients
          )}
          recipeId={recipe.id}
        />
      ))}
    </div>
  );
}
