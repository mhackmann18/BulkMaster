import { useLocation, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import RecipeItem from "../components/Recipe";
import "./Import.css";
import "./ImportedRecipe.css";

export default function ImportedRecipe({ redirectTo }) {
  const { state } = useLocation();

  return (
    <div id="import-recipe">
      {state ? (
        <RecipeItem recipe={state.recipe} />
      ) : (
        <Navigate to={redirectTo} />
      )}
    </div>
  );
}

ImportedRecipe.propTypes = {
  redirectTo: PropTypes.string.isRequired,
};
