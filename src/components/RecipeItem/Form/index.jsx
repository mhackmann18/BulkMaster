/* eslint-disable react/jsx-props-no-spreading */
import { useState } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faArrowLeft,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import RecipeContainer from "../RecipeContainer";
import TitleInput from "./TitleInput";
import ServingsInput from "./ServingsInput";
import TimeInput from "./TimeInput";
import AddButton from "./AddButton";
import InstructionsList from "./InstructionsList";
import IngredientInputsList from "./IngredientsList";
import ServingSizeInput from "./ServingSizeInput";
import NutrientsList from "./NutrientsList";
import Recipe, { nutrientUnits } from "../../../utils/Recipe";
import RecipeValidator from "../../../utils/RecipeValidator";
import StandardModal from "../../common/StandardModal";
import ConfirmationDisplay from "../../common/ConfirmationDisplay";
import { updateRecipeById } from "../../../utils/user";
import Toast from "../../common/Toast";
import useToast from "../../../hooks/useToast";

export default function RecipeForm({ startRecipe, onCancel }) {
  const [recipe, setRecipe] = useState(new Recipe({ ...startRecipe }));
  const {
    cookTime,
    ingredients,
    instructions,
    nutrients,
    prepTime,
    title,
    servings,
    servingSize,
    id,
  } = recipe;

  const recipeStatus = title ? "existing" : "new";

  // Toast

  const { toast, addSuccessToastMessage, addErrorToastMessage, closeToast } =
    useToast();

  // Modal

  const [closeFormModalOpen, setCloseFormModalOpen] = useState(false);

  const closeFormModal = () => {
    setCloseFormModalOpen(false);
  };

  // Form

  const {
    handleSubmit,
    register,
    unregister,
    watch,
    formState: { errors },
  } = useForm();

  const handleCloseButtonClick = () => {
    const recipeData = getRecipeFromFormData(watch(), id);

    if (!startRecipe.isEquivalent(recipeData)) {
      setCloseFormModalOpen(true);
    } else {
      onCancel();
    }
  };

  const onSubmit = async (data) => {
    const recipeData = getRecipeFromFormData(data, id);
    if (recipeData.error) {
      // Show error in ui
      addErrorToastMessage(recipeData.error);
    } else if (recipeData.id) {
      if (!startRecipe.isEquivalent(recipeData)) {
        // Update recipe
        const res = await updateRecipeById(recipeData, id);

        if (res.success) {
          addSuccessToastMessage(res.message);
        } else {
          addErrorToastMessage(res.message);
        }
      } else {
        addSuccessToastMessage("No changes to save");
      }
    } else if (!recipeData.id) {
      // Create recipe
      console.log(`Create new recipe`, recipeData);
    }
  };

  return (
    <form
      id="recipe"
      className="form-style"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <RecipeContainer
        titleComponent={
          <TitleInput
            errorMessage={errors.title && errors.title.message}
            startValue={title}
            {...register("title", {
              validate: RecipeValidator.getTitleErrMsg,
            })}
          />
        }
        subHeadingComponent={
          <>
            <ServingsInput
              startValue={servings}
              errorMessage={errors.servings && errors.servings.message}
              {...register("servings", {
                validate: RecipeValidator.getServingsErrMsg,
              })}
            />
            <TimeInput
              labelText="Prep Time"
              startValue={prepTime}
              errorMessage={errors.prepTime && errors.prepTime.message}
              {...register("prepTime", {
                validate: RecipeValidator.getTimeErrMsg,
                required: false,
              })}
            />
            <TimeInput
              labelText="Cook Time"
              startValue={cookTime}
              errorMessage={errors.cookTime && errors.cookTime.message}
              {...register("cookTime", {
                validate: RecipeValidator.getTimeErrMsg,
                required: false,
              })}
            />
          </>
        }
        buttonsComponent={
          recipeStatus === "existing" ? (
            <>
              <button
                onClick={handleCloseButtonClick}
                className="btn-default"
                type="button"
              >
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  size="sm"
                  className="button-panel-icon"
                />
                Back
              </button>
              <button type="submit" className="btn-default">
                <FontAwesomeIcon
                  icon={faCheck}
                  className="button-panel-icon"
                  size="sm"
                />
                Save Changes
              </button>
            </>
          ) : (
            <button type="submit" className="btn-default">
              <FontAwesomeIcon
                icon={faPlus}
                className="button-panel-icon"
                size="sm"
              />
              Create Recipe
            </button>
          )
        }
        ingredientsHeaderButtonComponent={
          <AddButton
            text="Add Ingredient"
            onClick={() => {
              recipe.addIngredient("", "", 0);
              setRecipe(new Recipe({ ...recipe }));
            }}
          />
        }
        ingredientsComponent={
          <IngredientInputsList
            ingredients={ingredients}
            onDeleteIngredient={(ingredientId, successMessage) => {
              unregister(`ingredients.${ingredientId}`);
              recipe.removeIngredientById(ingredientId);
              setRecipe(new Recipe({ ...recipe }));
              addSuccessToastMessage(successMessage);
            }}
            register={register}
            watch={watch}
            ingredientsErrors={errors.ingredients}
          />
        }
        instructionsHeaderButtonComponent={
          <AddButton
            text="Add Step"
            onClick={() => {
              recipe.addInstruction("");
              setRecipe(new Recipe({ ...recipe }));
            }}
          />
        }
        instructionsComponent={
          <InstructionsList
            instructions={instructions}
            onInstructionRemoveClick={(instructionId) => {
              unregister(`instructions.${instructionId}`);
              recipe.removeInstructionById(instructionId);
              setRecipe(new Recipe({ ...recipe }));
              addSuccessToastMessage("Instruction step deleted successfully");
            }}
            register={register}
            watch={watch}
            errors={errors && errors.instructions}
          />
        }
        nutrientsComponent={
          <>
            <ServingSizeInput
              servingSize={servingSize}
              register={register}
              servingSizeErrors={errors && errors.servingSize}
            />
            <NutrientsList
              nutrients={nutrients}
              register={register}
              errors={errors}
            />
          </>
        }
      />

      <StandardModal open={closeFormModalOpen} handleClose={closeFormModal}>
        <ConfirmationDisplay
          headerText="Unsaved Changes"
          messageText="Are you sure you want to leave this page? Changes you made will not be saved."
          cancelBtnText="Cancel"
          onCancel={closeFormModal}
          confirmBtnText="Leave Page"
          onConfirm={() => {
            onCancel();
          }}
        />
      </StandardModal>
      <Toast state={toast} onClose={closeToast} />
    </form>
  );
}

function getRecipeFromFormData(data, recipeId) {
  if (!data.ingredients) {
    return { error: "Recipe must have at least one ingredient" };
  }

  const newIngredients = [];
  for (const [key, value] of Object.entries(data.ingredients)) {
    newIngredients.push({
      id: key,
      quantity: Number(value.quantity) || null,
      unit: value.unit || null,
      name: value.name,
    });
  }

  const newInstructions = [];
  if (data.instructions && data.instructions.length) {
    for (const [key, value] of Object.entries(data.instructions)) {
      newInstructions.push({ id: key, text: value });
    }
  }

  const newNutrients = {};
  // console.log(data.nutrients);
  for (const [name, value] of Object.entries(data.nutrients)) {
    if (value || value === "0") {
      newNutrients[name] = {
        quantity: Number(value),
        unit: nutrientUnits[name],
      };
    }
  }

  // console.log(newNutrients);

  let newServingSize;
  if (data.servingSize.quantity || data.servingSize.unit) {
    newServingSize = {
      quantity: Number(data.servingSize.quantity) || null,
      unit: data.servingSize.unit || null,
    };
  } else {
    newServingSize = null;
  }

  return new Recipe({
    id: recipeId,
    title: data.title,
    servings: Number(data.servings),
    prepTime: Number(data.prepTime) || null,
    cookTime: Number(data.cookTime) || null,
    ingredients: newIngredients,
    instructions: newInstructions,
    nutrients: Object.keys(newNutrients).length ? newNutrients : null,
    servingSize: newServingSize,
  });
}

RecipeForm.propTypes = {
  startRecipe: PropTypes.instanceOf(Recipe).isRequired,
  onCancel: PropTypes.func,
};

RecipeForm.defaultProps = {
  onCancel: () => null,
};
