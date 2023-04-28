import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClone,
  faTrashCan,
  // faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import "./index.css";

export default function LibraryItem({
  recipeId,
  recipeTitle,
  recipeServings,
  caloriesPerRecipeServing,
  setDeleteModal,
}) {
  const navigate = useNavigate();

  return (
    <div
      className="library-item"
      onClick={() => navigate(`/dashboard/recipe-library/${recipeId}`)}
    >
      <div className="left">
        <h2>{recipeTitle}</h2>
        <div className="row">
          <span>Servings: {recipeServings}</span>
          {caloriesPerRecipeServing ? (
            <span>Calories per Serving: {caloriesPerRecipeServing}</span>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="right">
        <FontAwesomeIcon
          icon={faTrashCan}
          className="option-btn btn"
          title="Delete"
          size="1x"
          onClick={(e) => {
            setDeleteModal({
              open: true,
              itemId: recipeId,
              message: `Are you sure you want to delete the recipe '${recipeTitle}'?`,
            });
            e.stopPropagation();
          }}
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
        {/* <FontAwesomeIcon
          icon={faPenToSquare}
          className="option-btn btn"
          title="Edit"
          size="1x"
          onClick={(e) => {
            navigate(`/dashboard/recipe-library/${recipeId}/edit`);
            e.stopPropagation();
          }}
        /> */}
      </div>
    </div>
  );
}

LibraryItem.propTypes = {
  recipeId: PropTypes.number.isRequired,
  recipeTitle: PropTypes.string.isRequired,
  recipeServings: PropTypes.number.isRequired,
  caloriesPerRecipeServing: PropTypes.number,
  setDeleteModal: PropTypes.func.isRequired,
};

LibraryItem.defaultProps = {
  caloriesPerRecipeServing: 0,
};
