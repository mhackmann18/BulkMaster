import PropTypes from "prop-types";
import RecipeContainer from "../RecipeContainer";
import RecipeNameInput from "./TitleInput";
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
import Nutrient from "../../../utils/Nutrient";

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
  // const [titleInputErrorMessage, setTitleInputErrorMessage] = useState("");
  // const [servingsInputErrorMessage, setServingsInputErrorMessage] =
  //   useState("");

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
    const formIsValid = true;

    // const checkInput = (inputValue, validatorFn, setInputErrorMessage) => {
    //   const [inputIsValid, inputErrorMessage] = validatorFn(inputValue);
    //   if (!inputIsValid) {
    //     formIsValid = false;
    //     setInputErrorMessage(inputErrorMessage);
    //   } else {
    //     setInputErrorMessage("");
    //   }
    // };

    const titleInputValue = e.target["recipe-title"].value;
    const servingsInputValue = e.target["servings-quantity"].value;
    const prepTimeInputValue = e.target["prep-time"].value;
    const cookTimeInputValue = e.target["cook-time"].value;
    const ingredientInputs = [];
    if (e.target["ingredient-name"].length) {
      for (let i = 0; i < e.target["ingredient-name"].length; i++) {
        console.log(e.target["ingredient-quantity"][i]);
        const quantity = e.target["ingredient-quantity"][i].value;
        const units = e.target["ingredient-unit"][i].value;
        const name = e.target["ingredient-name"][i].value;
        ingredientInputs.push([quantity, units, name].join(" ").trim());
      }
    } else {
      const quantity = e.target["ingredient-quantity"].value;
      const units = e.target["ingredient-unit"].value;
      const name = e.target["ingredient-name"].value;
      ingredientInputs.push([quantity, units, name].join(" ").trim());
    }
    const instructionsInputs = [];
    if (e.target.instruction.length) {
      for (let i = 0; i < e.target.instruction.length; i++) {
        instructionsInputs.push(e.target.instruction[i].value);
      }
    } else if (e.target.instruction.value) {
      instructionsInputs.push(e.target.instruction.value);
    }
    const servingSizeQuantityInputValue =
      e.target["serving-size-quantity"].value;
    const servingSizeUnitInputValue = e.target["serving-size-unit"].value;
    const nutrientInputs = [];
    for (const validNutrient of Nutrient.getValidNutrients()) {
      if (
        e.target[`${validNutrient.name}`] &&
        e.target[`${validNutrient.name}`].value
      ) {
        nutrientInputs.push({
          name: validNutrient.name,
          quantity: e.target[`${validNutrient.name}`].value,
          unit: validNutrient.unit,
        });
      }
    }

    const obj = {
      title: titleInputValue,
      servings: servingsInputValue,
      cookTime: cookTimeInputValue,
      prepTime: prepTimeInputValue,
      ingredients: ingredientInputs,
      instructions: instructionsInputs,
      servingSize: `${servingSizeQuantityInputValue} ${servingSizeUnitInputValue}`,
      nutrients: nutrientInputs,
    };

    console.log(obj);
    console.log(formIsValid);
  }

  return (
    <form id="recipe" className="form-style" onSubmit={handleSubmit} noValidate>
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
