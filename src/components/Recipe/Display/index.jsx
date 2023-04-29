import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import RecipeContainer from "../RecipeContainer";
import RecipeTimesDisplay from "./TimesDisplay";
import IngredientsList from "./IngredientsList";
import NutrientsList from "./NutrientsList";

export default function RecipeDisplay({ recipe, switchToForm }) {
  const {
    cookTime,
    ingredients,
    instructions,
    nutrients,
    prepTime,
    title,
    servings,
    servingSize,
  } = recipe;

  const navigate = useNavigate();

  const recipeStatus = recipe.id ? "saved" : "imported";

  let buttonsPanelObjects;

  if (recipeStatus === "imported") {
    buttonsPanelObjects = [
      {
        text: "Back",
        action: () => navigate("/dashboard/import-recipe"),
      },
      { text: "Edit", type: "button", action: switchToForm },
      {
        text: "Save",
        type: "button",
        action: (e) => console.log("Save to Library") || e.preventDefault(),
      },
    ];
  } else if (recipeStatus === "saved") {
    buttonsPanelObjects = [
      {
        text: "Back",
        type: "button",
        action: () => navigate(-1),
      },
      { text: "Edit", type: "button", action: switchToForm },
    ];
  }

  return (
    <div id="recipe">
      <RecipeContainer
        nameComponent={<h2>{title}</h2>}
        timesComponent={
          <RecipeTimesDisplay prepTime={prepTime} cookTime={cookTime} />
        }
        buttonsPanelObjects={buttonsPanelObjects}
        ingredientsComponent={<IngredientsList ingredients={ingredients} />}
        instructionsComponent={
          <ol id="instructions-list">
            {instructions.map((el) => (
              <li key={el}>{el}</li>
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
  recipe: PropTypes.shape({
    id: PropTypes.number,
    cookTime: PropTypes.number,
    ingredients: PropTypes.arrayOf(PropTypes.string),
    instructions: PropTypes.arrayOf(PropTypes.string),
    nutrients: PropTypes.arrayOf(PropTypes.string),
    prepTime: PropTypes.number,
    title: PropTypes.string,
    servings: PropTypes.number,
    servingSize: PropTypes.string,
  }).isRequired,
  switchToForm: PropTypes.func.isRequired,
};
