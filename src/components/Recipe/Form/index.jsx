import PropTypes from "prop-types";
import RecipeContainer from "../RecipeContainer";
import RecipeNameInput from "./NameInput";
import RecipeTimesInputs from "./TimesInputs";
import AddButton from "./AddButton";
import InstructionsList from "./InstructionsList";
import IngredientInputsList from "./IngredientsList";
import ServingInputs from "./ServingInputs";
import NutrientsList from "./NutrientsList";

export default function RecipeForm({ recipe, switchToDiv }) {
  const {
    cookTime,
    ingredients,
    instructions,
    nutrients,
    prepTime,
    title,
    servings,
  } = recipe;

  const recipeStatus = recipe.title ? "existing" : "new";

  let buttonsPanelObjects;

  if (recipeStatus === "existing") {
    buttonsPanelObjects = [
      { text: "Cancel", type: "button", action: switchToDiv },
      {
        text: "Save Changes",
        type: "submit",
      },
    ];
  } else if (recipeStatus === "new") {
    buttonsPanelObjects = [
      {
        text: "Save to Library",
        type: "button",
        action: (e) => console.log("Save to Library") || e.preventDefault(),
      },
    ];
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
        nameComponent={<RecipeNameInput value={title} />}
        timesComponent={
          <RecipeTimesInputs prepTime={prepTime} cookTime={cookTime} />
        }
        buttonsPanelObjects={buttonsPanelObjects}
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
    nutrients: PropTypes.arrayOf(PropTypes.string),
    prepTime: PropTypes.number,
    title: PropTypes.string,
    servings: PropTypes.number,
    servingSize: PropTypes.string,
  }),
  switchToDiv: PropTypes.func,
};

RecipeForm.defaultProps = {
  recipe: {
    cookTime: 0,
    ingredients: [],
    instructions: [""],
    nutrients: [],
    prepTime: 0,
    title: "",
    servings: 1,
    servingSize: "",
  },
  switchToDiv: () => null,
};
