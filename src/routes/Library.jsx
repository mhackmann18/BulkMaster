/* eslint-disable no-nested-ternary */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LibraryItem from "../components/LibraryItem";
import Recipe from "../utils/Recipe";
import User from "../utils/UserController";
import Toast from "../components/common/Toast";
import useToast from "../hooks/useToast";
import Spinner from "../components/common/Spinner";
import "./Library.css";

export default function Library() {
  const [recipes, setRecipes] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addErrorToastMessage, addSuccessToastMessage, closeToast, toast } =
    useToast();

  useEffect(() => {
    User.getRecipes().then((data) => {
      if (data.length) {
        const fr = data.map((r) => new Recipe({ ...r }));
        setRecipes(fr);
      } else if (data.message) {
        addErrorToastMessage(
          `Unable to load recipes. ${
            data.message || "An unexpected error occurred"
          }`
        );
        setError(true);
      }
      setIsLoading(false);
    });
  }, []);

  const removeRecipeById = (recipeId) =>
    setRecipes(recipes.filter((r) => r.id !== recipeId));

  const onItemRemoval = (recipeId) => {
    removeRecipeById(recipeId);
    addSuccessToastMessage("Recipe deleted");
  };

  const onItemDuplicate = () => {
    User.getRecipes().then((data) => {
      if (data.length) {
        const fr = data.map((r) => new Recipe({ ...r }));
        setRecipes(fr);
        addSuccessToastMessage("Recipe duplicated");
      } else {
        addErrorToastMessage(
          `Unable to refresh recipe list. ${
            data.message || "An unexpected error occurred"
          }`
        );
      }
    });
  };

  return (
    <>
      <div id="library-page">
        {recipes ? (
          recipes.map((recipe) => (
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
        ) : isLoading ? (
          <div className="center-content">
            <Spinner />
          </div>
        ) : (
          <div className="center-content">
            <div id="empty-library-message">
              <h3>
                {error
                  ? "There was a problem loading your recipes."
                  : "You haven't added any recipes yet."}
              </h3>
              {error ? (
                <p>Please try refreshing the page.</p>
              ) : (
                <p>
                  Recipes that you{" "}
                  <Link to="/dashboard/import-recipe">import</Link> or{" "}
                  <Link to="/dashboard/create-recipe">create</Link> will show up
                  here.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
      <Toast state={toast} onClose={closeToast} />
    </>
  );
}
