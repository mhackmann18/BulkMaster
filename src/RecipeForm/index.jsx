import PropTypes from "prop-types";
import NameInput from "./NameInput";
import NumberInput from "./NumberInput";
import TimesInputs from "./TimesInputs";
import InstructionsList from "./InstructionsList";
import NutrientsList from "./NutrientsList";
import "../Recipe/Recipe.css";
import "./index.css";
import IngredientsList from "./IngredientsList";

export default function RecipeForm({ recipe }) {
  const {
    cookTime,
    ingredients,
    instructions,
    nutrients,
    prepTime,
    title,
    servings,
  } = recipe;

  return (
    <form id="recipe">
      <header id="recipe-header">
        <div className="left">
          <NameInput value={title} />
          <div className="row">
            <label htmlFor="servings">Servings: </label>
            <NumberInput
              startingValue={servings}
              maxValue={99}
              minValue={1}
              variant="no-spinner-wheel"
              title="Number of Servings"
              name="servings"
              id="servings"
            />
            <TimesInputs prepTime={prepTime} cookTime={cookTime} />
          </div>
        </div>
        <div className="right">
          <button id="recipe-cancel-btn" className="btn-onyx" type="button">
            Cancel
          </button>
          <button id="recipe-save-btn" className="btn-onyx" type="submit">
            Save
          </button>
        </div>
      </header>
      <div id="recipe-content" className="two-col">
        <div id="ingredients-container">
          <h3>Ingredients</h3>
          <IngredientsList ingredients={ingredients} />
        </div>
        <div id="instructions-container">
          <h3>Instructions</h3>
          <InstructionsList instructions={instructions} />

          <h3>Nutrition Facts</h3>
          <NutrientsList nutrients={nutrients} />
        </div>
      </div>
    </form>
  );
}

RecipeForm.propTypes = {
  recipe: PropTypes.shape({
    cookTime: PropTypes.number,
    ingredients: PropTypes.arrayOf(PropTypes.string),
    instructions: PropTypes.arrayOf(PropTypes.string),
    nutrients: PropTypes.object,
    prepTime: PropTypes.number,
    title: PropTypes.string,
    servings: PropTypes.number,
  }),
};

RecipeForm.defaultProps = {
  recipe: {
    cookTime: 0,
    ingredients: [],
    instructions: [],
    nutrients: {},
    prepTime: 0,
    title: "",
    servings: 1,
  },
};
