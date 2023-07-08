import { useState, useEffect } from "react";
import LibraryItem from "../components/LibraryItem";
// import data from "../assets/data.json";
import useUser from "../hooks/useUser";
import Recipe from "../utils/Recipe";
import User from "../utils/UserController";
import "./Library.css";

export default function Library() {
  const [recipes, setRecipes] = useState(null);
  // const recipes = data;
  const { user } = useUser();

  useEffect(() => {
    if (user.token) {
      User.getRecipes(user.token).then((data) => {
        if (data.length) {
          console.log(data);
          // setRecipes(data);
          const fr = data.map((r) => new Recipe({ ...r }));
          console.log(fr);
          setRecipes(fr);
        } else {
          console.log(data.message);
        }
      });
    }
  }, []);

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
            />
          ))
        : null}
    </div>
  );
}
