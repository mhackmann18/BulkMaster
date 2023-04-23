import RecipeItem from "../components/RecipeItem";
import data from "../assets/data.json";

export default function Library() {
  const recipes = data;

  return (
    <div id="library-page">
      {recipes.map((recipe) => (
        <RecipeItem
          key={recipe.id}
          recipeTitle={recipe.title}
          recipeServings={recipe.servings}
          caloriesPerRecipeServing={recipe.nutrients.calories.quantity}
          recipeId={recipe.id}
        />
      ))}
    </div>
  );
}
