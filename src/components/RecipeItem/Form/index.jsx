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

    const titleInput = e.target["recipe-title"].value;
    const servingsInput = e.target["servings-quantity"].value;
    const prepTimeInput = e.target["prep-time"].value;
    const cookTimeInput = e.target["cook-time"].value;
    const ingredientInputs = [];
    for (let i = 0; i < e.target["ingredient-name"].length; i++) {
      const quantity = e.target["ingredient-quantity"][i].value;
      const units = e.target["ingredient-unit"][i].value;
      const name = e.target["ingredient-name"][i].value;
      ingredientInputs.push([quantity, units, name].join(" ").trim());
    }
    const instructionsInputs = [];
    for (let i = 0; i < e.target.instruction.length; i++) {
      instructionsInputs.push(e.target.instruction[i].value);
    }
    const servingSizeQuantity = e.target["serving-size-quantity"].value;
    const servingSizeUnit = e.target["serving-size-unit"].value;
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
      title: titleInput,
      servings: servingsInput,
      cookTime: cookTimeInput,
      prepTime: prepTimeInput,
      ingredients: ingredientInputs,
      instructions: instructionsInputs,
      servingSize: `${servingSizeQuantity} ${servingSizeUnit}`,
      nutrients: nutrientInputs,
    };

    console.log(obj);
    console.log(formIsValid);
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
