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
  } = recipe;

  const navigate = useNavigate();

  const recipeStatus = recipe.id ? "saved" : "imported";

  let buttonsPanelObjects;

  if (recipeStatus === "imported") {
    buttonsPanelObjects = [
      // {
      //   text: "Back",
      //   action: () => navigate(`/dashboard/import-recipe`),
      // },
      { text: "Edit", action: switchToForm },
      {
        text: "Save",
        action: (e) => console.log("Save to Library") || e.preventDefault(),
      },
    ];
  } else if (recipeStatus === "saved") {
    buttonsPanelObjects = [
      {
        text: "Back",
        action: () => navigate(`/dashboard/recipe-library`),
      },
      { text: "Edit", action: switchToForm },
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
          <NutrientsList nutrients={nutrients} servings={servings} />
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
    nutrients: PropTypes.object,
    prepTime: PropTypes.number,
    title: PropTypes.string,
    servings: PropTypes.number,
  }).isRequired,
  switchToForm: PropTypes.func.isRequired,
};
