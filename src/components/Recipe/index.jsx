import PropTypes from "prop-types";
import NameInput from "./NameInput";
import TimesInputs from "./TimesInputs";
import TimesDisplay from "./TimesDisplay";
import InstructionsList from "./InstructionsList";
import ServingInputs from "./ServingInputs";
import NutrientsList from "./NutrientsList";
import IngredientsList from "./IngredientsList";
import AddButton from "./AddButton";
import {
  getNewIngredientString,
  getNutrientsStr,
} from "../../utils/formatScrapedRecipe";
import "./index.css";

export default function Recipe({ recipe }) {
  const {
    cookTime,
    ingredients,
    instructions,
    nutrients,
    prepTime,
    title,
    servings,
  } = recipe;

  const isFormActive = true;

  let timesComponent;
  let ingredientsList;
  let instructionsList;
  let nutrientsComponent;

  if (isFormActive) {
    timesComponent = <TimesInputs prepTime={prepTime} cookTime={cookTime} />;
    ingredientsList = <IngredientsList ingredients={ingredients} />;
    instructionsList = <InstructionsList instructions={instructions} />;
    nutrientsComponent = (
      <>
        <ServingInputs
          servingSize={nutrients && nutrients.servingSize}
          servings={servings}
        />
        <NutrientsList nutrients={nutrients} />
      </>
    );
  } else {
    timesComponent = <TimesDisplay prepTime={prepTime} cookTime={cookTime} />;
    ingredientsList = (
      <ul>
        {ingredients.map((el) => (
          <li key={el}>{getNewIngredientString(el, 1)}</li>
        ))}
      </ul>
    );
    instructionsList = (
      <ol>
        {instructions.map((el) => (
          <li key={el}>{el}</li>
        ))}
      </ol>
    );
    nutrientsComponent = getNutrientsStr(nutrients, 1);
  }

  return (
    <form id="recipe">
      <header id="recipe-header">
        <div className="left">
          {isFormActive ? <NameInput value={title} /> : <h2>{title}</h2>}
          <div className="row">{timesComponent}</div>
        </div>
        <div className="right">
          {/* Take care of the buttons */}
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
            Ingredients {isFormActive && <AddButton text="Add Ingredient" />}
          </h3>
          {ingredientsList}
        </div>
        <div id="instructions-container">
          <h3 id="instructions-header">
            Instructions {isFormActive && <AddButton text="Add Step" />}
          </h3>
          {instructionsList}

          {(nutrients || isFormActive) && (
            <h3 id="nutrition-facts-header">
              Nutrition Facts{" "}
              {isFormActive && <AddButton text="Add Nutrient" />}
            </h3>
          )}
          {nutrientsComponent}
        </div>
      </div>
    </form>
  );
}

Recipe.propTypes = {
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

Recipe.defaultProps = {
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
