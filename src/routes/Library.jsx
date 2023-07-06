import LibraryItem from "../components/LibraryItem";
import data from "../assets/data.json";
import "./Library.css";

export default function Library() {
  const recipes = data;

  return (
    <div id="library-page">
      {recipes.map((recipe) => (
        <LibraryItem
          key={recipe.id}
          recipeTitle={recipe.title}
          recipeServings={recipe.servings}
          caloriesPerRecipeServing={
            recipe.nutrients &&
            recipe.nutrients.calories &&
            recipe.nutrients.calories.quantity
          }
          recipeId={recipe.id}
        />
      ))}
    </div>
  );
}
