import PropTypes from "prop-types";
import RecipeContainer from "../RecipeContainer";
import RecipeNameInput from "./NameInput";
import ServingsInput from "./ServingsInput";
import RecipeTimesInputs from "./TimesInputs";
import ExistingRecipeButtons from "./ExistingRecipeButtons";
import NewRecipeButtons from "./NewRecipeButtons";
import AddButton from "./AddButton";
import InstructionsList from "./InstructionsList";
import IngredientInputsList from "./IngredientsList";
import ServingSizeInput from "./ServingSizeInput";
import NutrientsList from "./NutrientsList";
import Recipe from "../../../utils/Recipe";

export default function RecipeForm({ recipe, handleCancelButtonClick }) {
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

  const recipeStatus = recipe.title ? "existing" : "new";

  let buttonsPanel;

  if (recipeStatus === "existing") {
    buttonsPanel = (
      <ExistingRecipeButtons
        handleCancelButtonClick={handleCancelButtonClick}
      />
    );
  } else if (recipeStatus === "new") {
    buttonsPanel = <NewRecipeButtons />;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const recipeTitle = e.target["recipe-name"].value;
    const prepTimeNumber = e.target["prep-time-number"].value;
    const prepTimeUnits = e.target["prep-time-units"].value;
    const cookTimeNumber = e.target["cook-time-number"].value;
    const cookTimeUnits = e.target["cook-time-units"].value;
    const ingredientStrings = [];
    for (let i = 0; i < e.target["ingredient-name"].length; i += 1) {
      const quantity = e.target["ingredient-quantity"][i].value;
      const units = e.target["ingredient-unit"][i].value;
      const name = e.target["ingredient-name"][i].value;
      ingredientStrings.push([quantity, units, name].join(" ").trim());
    }
    const instructionStrings = [];
    for (const el of e.target.instruction) {
      instructionStrings.push(el.value);
    }
    const servingSizeQuantity = e.target["serving-size-quantity"].value;
    const servingSizeUnit = e.target["serving-size-unit"].value;

    const obj = {
      title: recipeTitle,
      cookTime: cookTimeNumber && `${cookTimeNumber} ${cookTimeUnits}`,
      prepTime: prepTimeNumber && `${prepTimeNumber} ${prepTimeUnits}`,
      ingredients: ingredientStrings,
      instructions,
      yields: `${servingSizeQuantity} ${servingSizeUnit}`,
    };

    console.log(obj);
  }

  return (
    <form id="recipe" className="form-style" onSubmit={handleSubmit}>
      <RecipeContainer
        titleComponent={<RecipeNameInput value={title} />}
        subHeadingComponent={
          <>
            <ServingsInput startingValue={servings} />
            <RecipeTimesInputs prepTime={prepTime} cookTime={cookTime} />
          </>
        }
        buttonsComponent={buttonsPanel}
        ingredientsHeaderButtonComponent={<AddButton text="Add Ingredient" />}
        ingredientsComponent={
          <IngredientInputsList ingredients={ingredients} />
        }
        instructionsHeaderButtonComponent={<AddButton text="Add Step" />}
        instructionsComponent={<InstructionsList instructions={instructions} />}
        // nutrientsHeaderButtonComponent={<AddButton text="Add Nutrient" />}
        nutrientsComponent={
          <>
            <ServingSizeInput servingSize={servingSize} />
            <NutrientsList nutrients={nutrients} />
          </>
        }
      />
    </form>
  );
}

RecipeForm.propTypes = {
  recipe: PropTypes.instanceOf(Recipe).isRequired,
  handleCancelButtonClick: PropTypes.func,
};

RecipeForm.defaultProps = {
  handleCancelButtonClick: () => null,
};
