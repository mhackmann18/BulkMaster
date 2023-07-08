import { useState, useEffect } from "react";
import LibraryItem from "../components/LibraryItem";
import useUser from "../hooks/useUser";
import Recipe from "../utils/Recipe";
import User from "../utils/UserController";
import "./Library.css";

export default function Library() {
  const [recipes, setRecipes] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    if (user.token) {
      User.getRecipes(user.token).then((data) => {
        if (data.length) {
          const fr = data.map((r) => new Recipe({ ...r }));
          setRecipes(fr);
        } else {
          console.log(data.message);
        }
      });
    }
  }, []);

  const removeRecipeById = (recipeId) =>
    setRecipes(recipes.filter((r) => r.id !== recipeId));

  return (
    <div id="library-page">
      {recipes
        ? recipes.map((recipe) => (
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
              removeLibraryItemById={removeRecipeById}
            />
          ))
        : null}
    </div>
  );
}
