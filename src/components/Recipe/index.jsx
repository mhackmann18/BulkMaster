import PropTypes from "prop-types";
import NameInput from "./NameInput";
import TimesInputs from "./TimesInputs";
import InstructionsList from "./InstructionsList";
import ServingInputs from "./ServingInputs";
import NutrientsList from "./NutrientsList";
import "./RecipeDisplay.css";
import "./index.css";
import IngredientsList from "./IngredientsList";
import AddButton from "./AddButton";

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
          <h3>
            Ingredients <AddButton text="Add Ingredient" />
          </h3>
          <IngredientsList ingredients={ingredients} />
        </div>
        <div id="instructions-container">
          <h3 id="instructions-header">
            Instructions <AddButton text="Add Step" />
          </h3>
          <InstructionsList instructions={instructions} />

          <h3 id="nutrition-facts-header">
            Nutrition Facts <AddButton text="Add Nutrient" />
          </h3>

          <ServingInputs
            servingSize={nutrients && nutrients.servingSize}
            servings={servings}
          />

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
    instructions: [""],
    nutrients: {},
    prepTime: 0,
    title: "",
    servings: 1,
  },
};
