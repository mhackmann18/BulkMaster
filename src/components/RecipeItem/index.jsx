import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import "./index.css";

export default function RecipeItem({
  recipeTitle,
  recipeServings,
  caloriesPerRecipeServing,
  handleClick,
}) {
  return (
    <div className="recipe-item-wrapper" onClick={handleClick}>
      <header className="recipe-item">
        <div className="left">
          <h2>{recipeTitle}</h2>
          <div className="row">
            <span>Servings: {recipeServings}</span>
            <span>Calories per Serving: {caloriesPerRecipeServing}</span>
          </div>
        </div>
        <div className="right">
          <FontAwesomeIcon
            icon={faEllipsis}
            className="options-btn btn"
            title="Options"
            size="lg"
          />
        </div>
      </header>
    </div>
  );
}

RecipeItem.propTypes = {
  recipeTitle: PropTypes.string.isRequired,
  recipeServings: PropTypes.number.isRequired,
  caloriesPerRecipeServing: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
};
