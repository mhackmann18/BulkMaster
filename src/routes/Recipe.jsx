import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import RecipeItem from "../components/RecipeItem";
import Recipe from "../utils/Recipe";
import User from "../utils/UserController";
import "./Import.css";

export default function RecipePage({ edit }) {
  const [recipe, setRecipe] = useState(null);
  const { state } = useLocation();
  const { id: recipeId } = useParams();

  useEffect(() => {
    if (recipeId) {
      User.getRecipe(recipeId).then((data) => {
        if (data.id) {
          console.log(data);
          // setRecipes(data);
          const fr = new Recipe({ ...data });
          console.log(fr);
          setRecipe(fr);
        } else {
          console.log(`Error: ${data.message}`);
        }
      });
    }
  }, []);

  return (
    <div id="import-page">
      {recipe && (
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
