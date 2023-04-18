import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClone,
  faTrashCan,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import "./index.css";

export default function RecipeItem({
  recipeId,
  recipeTitle,
  recipeServings,
  caloriesPerRecipeServing,
}) {
  const navigate = useNavigate();

  return (
    <div
      className="recipe-item-wrapper"
      onClick={() => navigate(`/dashboard/recipe-library/${recipeId}`)}
    >
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
            icon={faTrashCan}
            className="option-btn btn"
            title="Delete"
            size="1x"
            onClick={(e) =>
              console.log(`Delete recipe with id: ${recipeId}`) ||
              e.stopPropagation()
            }
          />
          <FontAwesomeIcon
            icon={faClone}
            className="option-btn btn"
            title="Duplicate"
            size="1x"
            onClick={(e) =>
              console.log(`Duplicate recipe with id: ${recipeId}`) ||
              e.stopPropagation()
            }
          />
          <FontAwesomeIcon
            icon={faPenToSquare}
            className="option-btn btn"
            title="Edit"
            size="1x"
            onClick={(e) =>
              console.log(`Edit recipe with id: ${recipeId}`) ||
              e.stopPropagation()
            }
          />
        </div>
      </header>
    </div>
  );
}

RecipeItem.propTypes = {
  recipeId: PropTypes.number.isRequired,
  recipeTitle: PropTypes.string.isRequired,
  recipeServings: PropTypes.number.isRequired,
  caloriesPerRecipeServing: PropTypes.number.isRequired,
};
