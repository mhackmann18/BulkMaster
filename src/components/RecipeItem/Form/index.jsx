import { useState } from "react";
import PropTypes from "prop-types";
import RecipeContainer from "../RecipeContainer";
import TitleInput from "./TitleInput";
import ServingsInput from "./ServingsInput";
import TimeInput from "./TimeInput";
import Button from "../../common/Button";
import AddButton from "./AddButton";
import InstructionsList from "./InstructionsList";
import IngredientInputsList from "./IngredientsList";
import ServingSizeInput from "./ServingSizeInput";
import NutrientsList from "./NutrientsList";
import Recipe from "../../../utils/Recipe";
import Nutrient from "../../../utils/Nutrient";
import RecipeValidator from "../../../utils/RecipeValidator";

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

  // Form inputs error messages
  const [titleInputErrorMessage, setTitleInputErrorMessage] = useState("");
  const [servingsInputErrorMessage, setServingsInputErrorMessage] =
    useState("");
  const [prepTimeInputErrMsg, setPrepTimeInputErrMsg] = useState("");
  const [cookTimeInputErrMsg, setCookTimeInputErrMsg] = useState("");

  const recipeStatus = recipe.title ? "existing" : "new";

  const handleSubmit = (e) => {
    e.preventDefault();
    let formIsValid = true;

    const checkInput = (inputValue, getErrMsg, showError) => {
      const errMsg = getErrMsg(inputValue);
      if (errMsg) {
        formIsValid = false;
        showError(errMsg);
      } else {
        showError("");
      }
    };

    const titleInputValue = e.target["recipe-title"].value;
    checkInput(
      titleInputValue,
      RecipeValidator.getTitleErrMsg,
      setTitleInputErrorMessage
    );

    const servingsInputValue = e.target["servings-quantity"].value;
    checkInput(
      servingsInputValue,
      RecipeValidator.getServingsErrMsg,
      setServingsInputErrorMessage
    );

    const prepTimeInputValue = e.target["prep-time"].value;
    checkInput(
      prepTimeInputValue,
      RecipeValidator.getTimeErrMsg,
      setPrepTimeInputErrMsg
    );

    const cookTimeInputValue = e.target["cook-time"].value;
    checkInput(
      cookTimeInputValue,
      RecipeValidator.getTimeErrMsg,
      setCookTimeInputErrMsg
    );

    const ingredientInputs = [];
    if (e.target["ingredient-name"].length) {
      for (let i = 0; i < e.target["ingredient-name"].length; i++) {
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
  };

  return (
    <form id="recipe" className="form-style" onSubmit={handleSubmit} noValidate>
      <RecipeContainer
        titleComponent={
          <TitleInput
            value={title}
            errMsg={titleInputErrorMessage}
            setErrMsg={setTitleInputErrorMessage}
          />
        }
        subHeadingComponent={
          <>
            <ServingsInput
              startingValue={servings}
              errMsg={servingsInputErrorMessage}
              setErrMsg={setServingsInputErrorMessage}
            />
            <TimeInput
              name="prep-time"
              labelText="Prep Time"
              defaultValue={prepTime}
              errMsg={prepTimeInputErrMsg}
              setErrMsg={setPrepTimeInputErrMsg}
            />
            <TimeInput
              name="cook-time"
              labelText="Cook Time"
              defaultValue={cookTime}
              errMsg={cookTimeInputErrMsg}
              setErrMsg={setCookTimeInputErrMsg}
            />
          </>
        }
        buttonsComponent={
          recipeStatus === "existing" ? (
            <>
              <Button
                text="Cancel"
                type="button"
                handleClick={handleCancelButtonClick}
              />
              <Button text="Save Changes" type="submit" />
            </>
          ) : (
            <Button text="Save to Library" type="submit" />
          )
        }
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
