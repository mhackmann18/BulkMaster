import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faPenToSquare,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import OpenCalculatorButton from "./OpenCalculatorButton";
import RecipeContainer from "../RecipeContainer";
import SubHeading from "./SubHeading";
import IngredientsList from "./IngredientsList";
import NutrientsList from "./NutrientsList";
import Recipe from "../../../utils/Recipe";
import { updateRecipeById } from "../../../utils/user";
import User from "../../../controllers/User";
import useUser from "../../../hooks/useUser";

export default function RecipeDisplay({
  startRecipe,
  switchToForm,
  setStartRecipe,
}) {
  const [recipe, setRecipe] = useState(new Recipe({ ...startRecipe }));
  const { user } = useUser();

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
  const navigate = useNavigate();
  const recipeStatus = id ? "saved" : "imported";

  const handleSaveButtonClick = () => {
    User.saveRecipe(recipe, user).then((data) => console.log(data));
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
            onSliderChange={(newServings) => {
              setRecipe(
                new Recipe({
                  ...startRecipe,
                  servings: newServings,
                }).multiplyIngredients(newServings / startRecipe.servings)
              );
            }}
            onSliderBlur={async (newServings) => {
              if (newServings === startRecipe.servings) {
                return false;
              }
              if (recipeStatus === "imported") {
                setStartRecipe(recipe);
              } else if (recipeStatus === "saved") {
                const res = await updateRecipeById(recipe, id);
                if (!res.success) {
                  // Show error modal here
                  console.log(res.message);
                  setRecipe({ ...startRecipe });
                }
              }
            }}
          />
        }
        buttonsComponent={
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
            <OpenCalculatorButton
              recipe={recipe}
              updateRecipe={(newRecipe) => console.log(newRecipe)}
            />
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
            {/* <Button text="Edit" type="button" handleClick={switchToForm} /> */}
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
    </div>
  );
}

RecipeDisplay.propTypes = {
  startRecipe: PropTypes.instanceOf(Recipe).isRequired,
  switchToForm: PropTypes.func.isRequired,
  setStartRecipe: PropTypes.func.isRequired,
};
