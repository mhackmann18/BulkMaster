import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClone,
  faTrashCan,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import StandardModal from "../common/StandardModal";
import ConfirmationDisplay from "../common/ConfirmationDisplay";
import "./index.css";

export default function LibraryItem({
  recipeId,
  recipeTitle,
  recipeServings,
  caloriesPerRecipeServing,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
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
              setModalOpen(true);
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
          <FontAwesomeIcon
            icon={faPenToSquare}
            className="option-btn btn"
            title="Edit"
            size="1x"
            onClick={(e) => {
              navigate(`/dashboard/recipe-library/${recipeId}`, {
                state: { edit: true },
              });
              e.stopPropagation();
            }}
          />
        </div>
      </div>
      <StandardModal open={modalOpen} handleClose={() => setModalOpen(false)}>
        <ConfirmationDisplay
          headerText="Delete Recipe"
          messageText={`Are you sure you want to delete the recipe '${recipeTitle}'?`}
          cancelBtnText="Cancel"
          confirmBtnText="Delete"
          onCancel={() => setModalOpen(false)}
          onConfirm={() => console.log(`Delete item with id: ${recipeId}`)}
        />
      </StandardModal>
    </>
  );
}

LibraryItem.propTypes = {
  recipeId: PropTypes.number.isRequired,
  recipeTitle: PropTypes.string.isRequired,
  recipeServings: PropTypes.number.isRequired,
  caloriesPerRecipeServing: PropTypes.number,
};

LibraryItem.defaultProps = {
  caloriesPerRecipeServing: 0,
};
