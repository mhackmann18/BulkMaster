import { useState } from "react";
import PropTypes from "prop-types";
import NameInput from "./Form/NameInput";
import IngredientsList from "./Display/IngredientsList";
import TimesInputs from "./Form/TimesInputs";
import TimesDisplay from "./Display/TimesDisplay";
import FormInstructionsList from "./Form/InstructionsList";
import ServingInputs from "./Form/ServingInputs";
import FormNutrientsList from "./Form/NutrientsList";
import FormIngredientsList from "./Form/IngredientsList";
import NutrientsList from "./Display/NutrientsList";
import AddButton from "./Form/AddButton";
import "./RecipeContainer.css";

export default function Recipe({ recipe, startingVariant }) {
  const {
    cookTime,
    ingredients,
    instructions,
    nutrients,
    prepTime,
    title,
    servings,
  } = recipe;

  const [variant, setVariant] = useState(startingVariant);

  let timesComponent;
  let ingredientsComponent;
  let instructionsComponent;
  let nutrientsComponent;

  if (variant === "edit") {
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
    nutrientsComponent = (
      <NutrientsList nutrients={nutrients} servings={servings} />
    );
  }

  return (
    <form id="recipe" className={variant === "edit" ? "form-style" : ""}>
      <header id="recipe-header">
        <div className="left">
          {variant === "edit" ? <NameInput value={title} /> : <h2>{title}</h2>}
          <div className="row">{timesComponent}</div>
        </div>
        <div className="right">
          <button
            id="recipe-cancel-btn"
            className="btn-onyx"
            type="button"
            onClick={(e) => {
              setVariant(!variant === "edit");
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
            Ingredients{" "}
            {variant === "edit" && <AddButton text="Add Ingredient" />}
          </h3>
          {ingredientsComponent}
        </div>
        <div id="instructions-container">
          <h3 id="instructions-header">
            Instructions {variant === "edit" && <AddButton text="Add Step" />}
          </h3>
          {instructionsComponent}

          {(nutrients || variant === "edit") && (
            <h3 id="nutrition-facts-header">
              Nutrition Facts{" "}
              {variant === "edit" && <AddButton text="Add Nutrient" />}
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
  startingVariant: PropTypes.oneOf([
    "display-imported",
    "display-existing",
    "edit-existing",
    "create-new",
  ]).isRequired,
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
