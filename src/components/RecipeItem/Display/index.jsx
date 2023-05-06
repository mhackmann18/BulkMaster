import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import OpenCalculatorButton from "./OpenCalculatorButton";
import RecipeContainer from "../RecipeContainer";
import SubHeading from "./SubHeading";
import IngredientsList from "./IngredientsList";
import NutrientsList from "./NutrientsList";
import Button from "../../common/Button";
import Recipe from "../../../utils/Recipe";

export default function RecipeDisplay({ recipe, switchToForm }) {
  const {
    cookTime,
    ingredients,
    instructions,
    nutrients,
    prepTime,
    title,
    servings,
    servingSize,
  } = recipe;
  const navigate = useNavigate();
  const recipeStatus = recipe.id ? "saved" : "imported";

  return (
    <div id="recipe">
      <RecipeContainer
        titleComponent={<h2>{title}</h2>}
        subHeadingComponent={
          <SubHeading
            servings={servings}
            prepTime={prepTime}
            cookTime={cookTime}
          />
        }
        buttonsComponent={
          <>
            <Button
              text="Back"
              type="button"
              handleClick={() => navigate(-1)}
            />
            <OpenCalculatorButton
              recipeServingsCount={servings}
              recipeCaloriesCount={
                recipe.getNutrientByName("calories").quantity
              }
              onSubmit={(val) => console.log(`${val}`)}
            />
            <Button text="Edit" type="button" handleClick={switchToForm} />
            {recipeStatus === "imported" && (
              <Button text="Save" type="button" handleClick={() => {}} />
            )}
          </>
        }
        ingredientsComponent={
          <IngredientsList
            ingredients={ingredients.map((ingredient) =>
              ingredient.getString()
            )}
          />
        }
        instructionsComponent={
          <ol id="instructions-list">
            {instructions.map((el) => (
              <li key={el}>{el}</li>
            ))}
          </ol>
        }
        nutrientsComponent={
          nutrients && (
            <NutrientsList
              nutrients={nutrients.map((nutrient) => nutrient.getString())}
              servingsCount={servings}
              servingSize={servingSize}
            />
          )
        }
      />
    </div>
  );
}

RecipeDisplay.propTypes = {
  recipe: PropTypes.instanceOf(Recipe).isRequired,
  switchToForm: PropTypes.func.isRequired,
};
