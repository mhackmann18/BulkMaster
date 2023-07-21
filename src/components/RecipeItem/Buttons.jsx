import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faPenToSquare,
  faBook,
  faPlus,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

export default function RecipeItemButtons({ buttonActions }) {
  if (!Object.keys(buttonActions).length) {
    return null;
  }

  const {
    onBackClick,
    onEditClick,
    onSaveRecipeClick,
    onSaveChangesClick,
    onCreateRecipeClick,
  } = buttonActions;

  const buttons = [];

  if (onBackClick) {
    buttons.push(
      <button
        className="btn-default"
        onClick={onBackClick}
        type="button"
        key="Back"
      >
        <FontAwesomeIcon
          className="button-panel-icon"
          icon={faArrowLeft}
          size="sm"
        />
        Back
      </button>
    );
  }

  if (onEditClick) {
    buttons.push(
      <button
        className="btn-default"
        onClick={onEditClick}
        type="button"
        key="Edit"
      >
        <FontAwesomeIcon
          className="button-panel-icon"
          icon={faPenToSquare}
          size="sm"
        />
        Edit
      </button>
    );
  }

  if (onSaveRecipeClick) {
    buttons.push(
      <button
        type="button"
        onClick={onSaveRecipeClick}
        className="btn-default"
        key="Save"
      >
        <FontAwesomeIcon
          className="button-panel-icon"
          icon={faBook}
          size="sm"
        />
        Save
      </button>
    );
  }

  if (onSaveChangesClick) {
    buttons.push(
      <button
        type="submit"
        className="btn-default"
        onClick={onSaveChangesClick}
        key="Save Changes"
      >
        <FontAwesomeIcon
          icon={faCheck}
          className="button-panel-icon"
          size="sm"
        />
        Save Changes
      </button>
    );
  }

  if (onCreateRecipeClick) {
    buttons.push(
      <button
        type="submit"
        className="btn-default"
        onClick={onCreateRecipeClick}
        key="Create Recipe"
      >
        <FontAwesomeIcon
          icon={faPlus}
          className="button-panel-icon"
          size="sm"
        />
        Create Recipe
      </button>
    );
  }

  return buttons;
}

const buttonAction = PropTypes.func;

RecipeItemButtons.propTypes = {
  buttonActions: PropTypes.exact({
    onBackClick: buttonAction,
    onEditClick: buttonAction,
    onSaveRecipeClick: buttonAction,
    onSaveChangesClick: buttonAction,
    onCreateRecipeClick: buttonAction,
  }).isRequired,
};
