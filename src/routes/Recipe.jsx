import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import recipes from "../assets/data.json";
import RecipeItem from "../components/RecipeItem";
import Recipe from "../utils/Recipe";
import "./Import.css";

export default function RecipePage({ edit }) {
  const [recipe, setRecipe] = useState(null);
  const { state } = useLocation();
  const { id } = useParams();

  for (const el of recipes) {
    if (!recipe && el.id === Number(id)) {
      setRecipe(el);
    }
  }

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
