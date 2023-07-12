import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import RecipeItem from "../components/RecipeItem";
import Recipe from "../utils/Recipe";
import User from "../utils/UserController";
import Spinner from "../components/common/Spinner";
import "./Recipe.css";

export default function RecipePage({ edit }) {
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { state } = useLocation();
  const { id: recipeId } = useParams();

  useEffect(() => {
    if (recipeId) {
      User.getRecipe(recipeId).then((data) => {
        if (data.id) {
          console.log(data);
          setRecipe(new Recipe({ ...data }));
        } else {
          console.log(`Error: ${data.message}`);
        }
        setIsLoading(false);
      });
    }
  }, []);

  return (
    <div id="recipe-page">
      {isLoading ? (
        <div className="spinner-wrapper">
          <Spinner />
        </div>
      ) : (
        <RecipeItem
          startRecipe={recipe ? new Recipe(recipe) : undefined}
          startingDisplayType={
            (state && state.startAsForm) || edit ? "form" : "div"
          }
        />
      )}
    </div>
  );
}

RecipePage.propTypes = {
  edit: PropTypes.bool,
};

RecipePage.defaultProps = {
  edit: false,
};
