import { useState } from "react";
import PropTypes from "prop-types";
import NameInput from "./RecipeNameInput";
import TimesInputs from "./TimesInputs";
import InstructionsList from "./InstructionsList";
import {
  getNewIngredientString,
  getNutrientsStr,
} from "../utils/formatScrapedRecipe";
import "../Recipe/Recipe.css";
import "./index.css";
import IngredientListItem from "./IngredientListItem";

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

  const [servingsInputValue, setServingsInputValue] = useState(servings);

  return (
    <form id="recipe">
      <div id="recipe-header">
        <NameInput value={title} />
        <TimesInputs prepTime={prepTime} cookTime={cookTime} />
      </div>
      <p>
        <input
          type="number"
          value={servingsInputValue}
          onChange={setServingsInputValue}
        />
      </p>
      <div id="recipe-content" className="two-col">
        <div id="ingredients-container">
          <h3>Ingredients</h3>
          <ul>
            {ingredients.map((el) => (
              <li key={el}>
                <IngredientListItem ingredient={getNewIngredientString(el)} />
              </li>
            ))}
          </ul>
        </div>
        <div id="instructions-container">
          <h3>Directions</h3>
          <InstructionsList instructions={instructions} />
          {nutrients && (
            <>
              <h3>Nutrition Facts</h3>
              {getNutrientsStr(nutrients)}
            </>
          )}
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
