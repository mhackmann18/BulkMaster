import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import recipes from "../assets/data.json";
import RecipeItem from "../components/Recipe";
import "./Import.css";

export default function Recipe({ edit }) {
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
      <RecipeItem
        recipe={recipe}
        startingDisplayType={(state && state.edit) || edit ? "form" : "div"}
      />
    </div>
  );
}

Recipe.propTypes = {
  edit: PropTypes.bool,
};

Recipe.defaultProps = {
  edit: false,
};
