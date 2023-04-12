import PropTypes from "prop-types";
import TimesDisplays from "../TimesDisplay";
import {
  getNewIngredientString,
  getIngredientsMultiplier,
  getNutrientsStr,
} from "../../../utils/formatScrapedRecipe";
import "../index.css";

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

  const servingsInputValue = servings;
  const caloriesInputValue = caloriesInitialValue;
  // const [servingsInputValue, setServingsInputValue] = useState(servings);
  // const [caloriesInputValue, setCaloriesInputValue] =
  //   useState(caloriesInitialValue);

  const ingredientsMultiplier = getIngredientsMultiplier(
    recipe,
    servingsInputValue,
    caloriesInputValue
  );
  const nutrientsMultiplier = caloriesInputValue / caloriesInitialValue;

  return (
    <div id="recipe">
      <header id="recipe-header">
        <div className="left">
          <h2>{title}</h2>
          <div className="row">
            <TimesDisplays prepTime={prepTime} cookTime={cookTime} />
          </div>
        </div>
        <div className="right">
          <button
            type="button"
            className="btn-onyx"
            onClick={(e) => e.preventDefault()}
          >
            Edit
          </button>
          <button
            type="button"
            className="btn-onyx"
            onClick={(e) => e.preventDefault()}
          >
            Save
          </button>
        </div>
      </header>
      <div id="recipe-content" className="two-col">
        <div id="ingredients-container">
          <h3>Ingredients</h3>
          <ul>
            {ingredients.map((el) => (
              <li key={el}>
                {getNewIngredientString(el, ingredientsMultiplier)}
              </li>
            ))}
          </ul>
        </div>
        <div id="instructions-container">
          <h3>Instructions</h3>
          <ol>
            {instructions.map((el) => (
              <li key={el}>{el}</li>
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

Recipe.propTypes = {
  recipe: PropTypes.shape({
    cookTime: PropTypes.number,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    instructions: PropTypes.arrayOf(PropTypes.string).isRequired,
    nutrients: PropTypes.object,
    prepTime: PropTypes.number,
    title: PropTypes.string.isRequired,
    servings: PropTypes.number,
  }).isRequired,
};
