import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import RecipeItem from "../components/RecipeItem";
import Recipe from "../utils/Recipe";
import User from "../utils/UserController";
import Spinner from "../components/common/Spinner";
import useToast from "../hooks/useToast";
import Toast from "../components/common/Toast";
import NoContentMessage from "../components/common/NoContentMessage";
import "./Recipe.css";

export default function RecipePage({ edit }) {
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { state } = useLocation();
  const { id: recipeId } = useParams();
  const { toast, closeToast, addErrorToastMessage } = useToast();

  // Load recipe
  useEffect(() => {
    if (recipeId) {
      User.getRecipe(recipeId).then((data) => {
        if (data.id) {
          console.log(data);
          setRecipe(new Recipe({ ...data }));
        } else if (data.message) {
          addErrorToastMessage(
            `Unable to load recipe. ${
              data.message || "An unknown error occurred"
            }`
          );
        }

        setIsLoading(false);
      });
    }
  }, []);

  const content = recipe ? (
    <RecipeItem
      startRecipe={recipe}
      startingDisplayType={state?.startAsForm || edit ? "form" : "div"}
    />
  ) : (
    <NoContentMessage
      headerText="There was a problem loading your recipe."
      subText="Please try refreshing the page."
    />
  );

  return (
    <>
      <div id="recipe-page">
        {isLoading ? (
          <div className="spinner-wrapper">
            <Spinner />
          </div>
        ) : (
          content
        )}
      </div>
      <Toast state={toast} onClose={closeToast} />
    </>
  );
}

RecipePage.propTypes = {
  edit: PropTypes.bool,
};

RecipePage.defaultProps = {
  edit: false,
};
