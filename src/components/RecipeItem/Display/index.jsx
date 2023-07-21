import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faPenToSquare,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import RecipeContainer from "../RecipeContainer";
import SubHeading from "./SubHeading";
import IngredientsList from "./IngredientsList";
import NutrientsList from "./NutrientsList";
import Recipe from "../../../utils/Recipe";
import User from "../../../utils/UserController";
import useUser from "../../../hooks/useUser";
import Toast from "../../common/Toast";
import useToast from "../../../hooks/useToast";
import useHandleAuthError from "../../../hooks/useHandleAuthError";

export default function RecipeDisplay({
  startRecipe,
  switchToForm,
  setStartRecipe,
  buttonsComponent,
}) {
  const [recipe, setRecipe] = useState(new Recipe({ ...startRecipe }));
  const {
    cookTime,
    ingredients,
    instructions,
    nutrients,
    prepTime,
    title,
    servings,
    servingSize,
    id,
  } = recipe;
  const { user } = useUser();
  const navigate = useNavigate();
  const handleAuthError = useHandleAuthError();
  const { addSuccessToastMessage, addErrorToastMessage, closeToast, toast } =
    useToast();

  const recipeStatus = id ? "saved" : "imported";

  const handleSaveButtonClick = async () => {
    // TODO: add loading indicator
    const { data, message, error } = await User.saveRecipe(recipe, user);

    handleAuthError(error);

    // Error
    if (message) {
      addErrorToastMessage(
        `Unable to save recipe. ${message || "An unexpected error occurred"}`
      );
    }
    // Success
    else if (data) {
      addSuccessToastMessage("Recipe added to library");
    }
  };

  const handleBlur = async (newServings) => {
    if (newServings === startRecipe.servings) {
      return false;
    }
    if (recipeStatus === "imported") {
      setStartRecipe(recipe);
    } else if (recipeStatus === "saved") {
      const { error, message } = await User.updateRecipe(recipe, id);
      handleAuthError(error);
      setStartRecipe(new Recipe({ ...recipe }));
      if (error) {
        // Show error modal here
        addErrorToastMessage(
          `Unable to update recipe servings. ${
            message || "An unexpected error occurred"
          }`
        );
        setStartRecipe(new Recipe({ ...startRecipe }));
      }
    }
  };

  const handleChange = (newServings) => {
    setRecipe(
      new Recipe({
        ...startRecipe,
        servings: newServings,
      }).multiplyIngredients(newServings / startRecipe.servings)
    );
  };

  return (
    <div id="recipe">
      <RecipeContainer
        titleComponent={<h2>{title}</h2>}
        subHeadingComponent={
          <SubHeading
            defaultServings={startRecipe.servings}
            servings={servings}
            prepTime={prepTime}
            cookTime={cookTime}
            onSliderChange={handleChange}
            onSliderBlur={handleBlur}
          />
        }
        buttonsComponent={
          buttonsComponent || (
            <>
              <button
                className="btn-default"
                onClick={() => navigate(-1)}
                type="button"
              >
                <FontAwesomeIcon
                  className="button-panel-icon"
                  icon={faArrowLeft}
                  size="sm"
                />
                Back
              </button>
              {/* <OpenCalculatorButton
              recipe={recipe}
              updateRecipe={(newRecipe) =>
                setRecipe(new Recipe({ ...newRecipe }))
              }
            /> */}
              <button
                className="btn-default"
                onClick={switchToForm}
                type="button"
              >
                <FontAwesomeIcon
                  className="button-panel-icon"
                  icon={faPenToSquare}
                  size="sm"
                />
                Edit
              </button>
              {recipeStatus === "imported" && (
                <button
                  type="button"
                  onClick={handleSaveButtonClick}
                  className="btn-default"
                >
                  <FontAwesomeIcon
                    className="button-panel-icon"
                    icon={faBook}
                    size="sm"
                  />
                  Save
                </button>
              )}
            </>
          )
        }
        ingredientsComponent={<IngredientsList ingredients={ingredients} />}
        instructionsComponent={
          <ol id="instructions-list">
            {instructions.map((el) => (
              <li key={el.id}>{el.text}</li>
            ))}
          </ol>
        }
        nutrientsComponent={
          nutrients && (
            <NutrientsList
              nutrients={nutrients}
              servingsCount={servings}
              servingSize={servingSize}
            />
          )
        }
      />
      <Toast state={toast} onClose={closeToast} />
    </div>
  );
}

RecipeDisplay.propTypes = {
  startRecipe: PropTypes.instanceOf(Recipe).isRequired,
  switchToForm: PropTypes.func,
  setStartRecipe: PropTypes.func,
  buttonsComponent: PropTypes.element,
};

RecipeDisplay.defaultProps = {
  switchToForm: () => null,
  setStartRecipe: () => null,
  buttonsComponent: null,
};
