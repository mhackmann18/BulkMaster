import { useState } from "react";
import PropTypes from "prop-types";
import NameInput from "./Form/NameInput";
import IngredientsList from "./IngredientsList";
import TimesInputs from "./Form/TimesInputs";
import TimesDisplay from "./TimesDisplay";
import FormInstructionsList from "./Form/InstructionsList";
import ServingInputs from "./Form/ServingInputs";
import FormNutrientsList from "./Form/NutrientsList";
import FormIngredientsList from "./Form/IngredientsList";
import AddButton from "./Form/AddButton";
import { getNutrientsStr } from "../../utils/formatScrapedRecipe";
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

  const [isFormActive, setIsFormActive] = useState(false);

  let timesComponent;
  let ingredientsComponent;
  let instructionsComponent;
  let nutrientsComponent;

  if (isFormActive) {
    timesComponent = <TimesInputs prepTime={prepTime} cookTime={cookTime} />;
    ingredientsComponent = <FormIngredientsList ingredients={ingredients} />;
    instructionsComponent = (
      <FormInstructionsList instructions={instructions} />
    );
    nutrientsComponent = (
      <>
        <ServingInputs
          servingSize={nutrients && nutrients.servingSize}
          servings={servings}
        />
        <FormNutrientsList nutrients={nutrients} />
      </>
    );
  } else {
    timesComponent = <TimesDisplay prepTime={prepTime} cookTime={cookTime} />;
    ingredientsComponent = <IngredientsList ingredients={ingredients} />;
    instructionsComponent = (
      <ol id="instructions-list">
        {instructions.map((el) => (
          <li key={el}>{el}</li>
        ))}
      </ol>
    );
    nutrientsComponent = getNutrientsStr(nutrients, 1);
  }

  return (
    <form id="recipe" className={isFormActive ? "form-style" : ""}>
      <header id="recipe-header">
        <div className="left">
          {isFormActive ? <NameInput value={title} /> : <h2>{title}</h2>}
          <div className="row">{timesComponent}</div>
        </div>
        <div className="right">
          <button
            id="recipe-cancel-btn"
            className="btn-onyx"
            type="button"
            onClick={(e) => {
              setIsFormActive(!isFormActive);
              e.preventDefault();
            }}
          >
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
          {ingredientsComponent}
        </div>
        <div id="instructions-container">
          <h3 id="instructions-header">
            Instructions {isFormActive && <AddButton text="Add Step" />}
          </h3>
          {instructionsComponent}

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
