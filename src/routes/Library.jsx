import { useState, useEffect } from "react";
import LibraryItem from "../components/LibraryItem";
import useUser from "../hooks/useUser";
import Recipe from "../utils/Recipe";
import User from "../utils/UserController";
import Toast from "../components/common/Toast";
import useToast from "../hooks/useToast";
import "./Library.css";

export default function Library() {
  const [recipes, setRecipes] = useState(null);
  const { addErrorToastMessage, addSuccessToastMessage, closeToast, toast } =
    useToast();
  const { user } = useUser();

  useEffect(() => {
    if (user.token) {
      User.getRecipes(user.token).then((data) => {
        if (data.length) {
          const fr = data.map((r) => new Recipe({ ...r }));
          setRecipes(fr);
        } else {
          addErrorToastMessage(
            `Unable to load recipes. ${
              data.message || "An unexpected error occurred"
            }`
          );
        }
      });
    }
  }, []);

  const removeRecipeById = (recipeId) =>
    setRecipes(recipes.filter((r) => r.id !== recipeId));

  const onItemRemoval = (recipeId) => {
    removeRecipeById(recipeId);
    addSuccessToastMessage("Recipe deleted successfully");
  };

  const onItemDuplicate = () => {
    if (user.token) {
      User.getRecipes(user.token).then((data) => {
        if (data.length) {
          const fr = data.map((r) => new Recipe({ ...r }));
          setRecipes(fr);
          addSuccessToastMessage("Recipe duplicated successfully");
        } else {
          addErrorToastMessage(
            `Unable to load updated recipe list. ${
              data.message || "An unexpected error occurred"
            }`
          );
        }
      });
    }
  };

  return (
    <>
      <div id="library-page">
        {recipes
          ? recipes.map((recipe) => (
              <LibraryItem
                key={recipe.id}
                recipe={recipe}
                recipeTitle={recipe.title}
                recipeServings={recipe.servings}
                caloriesPerRecipeServing={
                  recipe.nutrients &&
                  recipe.nutrients.calories &&
                  recipe.nutrients.calories.quantity
                }
                recipeId={recipe.id}
                addErrorToastMessage={addErrorToastMessage}
                onDelete={onItemRemoval}
                onDuplicate={onItemDuplicate}
              />
            ))
          : null}
      </div>
      <Toast state={toast} onClose={closeToast} />
    </>
  );
}
