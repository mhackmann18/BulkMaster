import PropTypes from "prop-types";
import RecipeContainer from "../RecipeContainer";
import RecipeTimesDisplay from "./TimesDisplay";
import IngredientsList from "./IngredientsList";
import NutrientsList from "./NutrientsList";

export default function RecipeDisplay({ recipe }) {
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
    <div id="recipe">
      <RecipeContainer
        nameComponent={<h2>{title}</h2>}
        timesComponent={
          <RecipeTimesDisplay prepTime={prepTime} cookTime={cookTime} />
        }
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
    cookTime: PropTypes.number,
    ingredients: PropTypes.arrayOf(PropTypes.string),
    instructions: PropTypes.arrayOf(PropTypes.string),
    nutrients: PropTypes.object,
    prepTime: PropTypes.number,
    title: PropTypes.string,
    servings: PropTypes.number,
  }).isRequired,
};
