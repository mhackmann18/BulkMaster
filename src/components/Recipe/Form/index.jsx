import PropTypes from "prop-types";
import RecipeContainer from "../RecipeContainer";
import RecipeNameInput from "./NameInput";
import RecipeTimesInputs from "./TimesInputs";
import AddButton from "./AddButton";
import InstructionsList from "./InstructionsList";
import IngredientInputsList from "./IngredientsList";
import ServingInputs from "./ServingInputs";
import NutrientsList from "./NutrientsList";

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
    <form id="recipe" className="form-style">
      <RecipeContainer
        nameComponent={<RecipeNameInput value={title} />}
        timesComponent={
          <RecipeTimesInputs prepTime={prepTime} cookTime={cookTime} />
        }
        ingredientsHeaderButtonComponent={<AddButton text="Add Ingredient" />}
        ingredientsComponent={
          <IngredientInputsList ingredients={ingredients} />
        }
        instructionsHeaderButtonComponent={<AddButton text="Add Step" />}
        instructionsComponent={<InstructionsList instructions={instructions} />}
        nutrientsHeaderButtonComponent={<AddButton text="Add Nutrient" />}
        nutrientsComponent={
          <>
            <ServingInputs
              servingSize={nutrients && nutrients.servingSize}
              servings={servings}
            />
            <NutrientsList nutrients={nutrients} />
          </>
        }
      />
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
