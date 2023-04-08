import { useState } from "react";
import PropTypes from "prop-types";
import NameInput from "./NameInput";
import TimesInputs from "./TimesInputs";
import TimesDisplays from "./TimesDisplay";
import Form from "./Form";
import {
  getNewIngredientString,
  getNutrientStringsFromObj,
} from "../utils/formatScrapedRecipe";
import "./Recipe.css";

export default function Recipe({ recipe }) {
  // The following recipe properties must be non-false values: title, instructions, servings, and ingredients
  const {
    cookTime,
    ingredients,
    instructions,
    nutrients,
    prepTime,
    title,
    servings,
  } = recipe;
  const caloriesInitialValue =
    nutrients && nutrients.calories && nutrients.calories.quantity;

  const [servingsInputValue, setServingsInputValue] = useState(servings);
  const [caloriesInputValue, setCaloriesInputValue] =
    useState(caloriesInitialValue);

  const ingredientsMultiplier = getIngredientsMultiplier(
    recipe,
    servingsInputValue,
    caloriesInputValue
  );
  const nutrientsMultiplier = caloriesInputValue / caloriesInitialValue;

  const editing = false;

  return (
    <div id="recipe">
      <div id="recipe-header">
        {editing ? <NameInput value={title} /> : <h2>{title}</h2>}
        {editing ? (
          <TimesInputs prepTime={prepTime} cookTime={cookTime} />
        ) : (
          <TimesDisplays prepTime={prepTime} cookTime={cookTime} />
        )}
        <div className="form-wrapper">
          <Form
            servingsDefaultValue={servings}
            servingsInputValue={servingsInputValue}
            setServingsInputValue={setServingsInputValue}
            caloriesDefaultValue={caloriesInitialValue}
            caloriesInputValue={caloriesInputValue}
            setCaloriesInputValue={setCaloriesInputValue}
          />
        </div>
      </div>
      <div id="recipe-content" className="two-col">
        <div id="ingredients-container">
          <h3>Ingredients</h3>
          <ul>
            {ingredients.map((el, i) => (
              <li key={i}>
                {getNewIngredientString(el, ingredientsMultiplier)}
              </li>
            ))}
          </ul>
        </div>
        <div id="instructions-container">
          <h3>Directions</h3>
          <ol>
            {instructions.map((el, i) => (
              <li key={i}>{el}</li>
            ))}
          </ol>
          {nutrients && (
            <>
              <h3>Nutrition Facts</h3>
              {getNutrientsStr(nutrients, nutrientsMultiplier)}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function getNutrientsStr(nutrients, mult = 1) {
  let nutrientStrings = getNutrientStringsFromObj(nutrients, mult);

  return nutrientStrings.reduce(
    (acc, el, i) =>
      i === nutrientStrings.length - 1 ? acc + `${el}` : acc + `${el}, `,
    ""
  );
}

function getIngredientsMultiplier(recipe, newServingsCount, newCaloriesCount) {
  if (!recipe || !newServingsCount) return 1;

  let oldServingsCount = recipe.servings;

  if (!newCaloriesCount) return newServingsCount / oldServingsCount;

  if (!oldServingsCount) return null;

  let oldCalorieCount = recipe.nutrients && recipe.nutrients.calories.quantity;

  if (!oldCalorieCount) return newServingsCount / oldServingsCount;

  return (
    ((newCaloriesCount / oldCalorieCount) * newServingsCount) / oldServingsCount
  );
}

Recipe.propTypes = {
  recipe: PropTypes.shape({
    cookTime: PropTypes.number,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    instructions: PropTypes.arrayOf(PropTypes.string).isRequired,
    nutrients: PropTypes.object,
    prepTime: PropTypes.number,
    title: PropTypes.string.isRequired,
    servings: PropTypes.number,
  }),
};
