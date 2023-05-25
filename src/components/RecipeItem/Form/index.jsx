/* eslint-disable react/jsx-props-no-spreading */
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { Snackbar, Alert } from "@mui/material";
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
import Recipe, { nutrientUnits } from "../../../utils/Recipe";
import RecipeValidator from "../../../utils/RecipeValidator";
import StandardModal from "../../common/StandardModal";
import ConfirmationDisplay from "../../common/ConfirmationDisplay";
import { updateRecipeById } from "../../../utils/user";

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

  const [toast, setToast] = useState({
    open: false,
    messages: [],
    activeMessage: "",
    severity: "success",
  });

  const addSuccessToastMessage = (message) => {
    setToast({
      ...toast,
      messages: [...toast.messages, message],
      severity: "success",
    });
  };

  const addErrorToastMessage = (message) => {
    setToast({
      ...toast,
      messages: [...toast.messages, message],
      severity: "error",
    });
  };

  const closeToast = () => {
    setToast({ ...toast, open: false });
  };

  useEffect(() => {
    if (!toast.open && toast.messages.length) {
      setToast({
        ...toast,
        open: true,
        activeMessage: toast.messages[0],
        messages: toast.messages.slice(1),
      });
    } else if (toast.open && toast.messages.length) {
      setToast({ ...toast, open: false });
    }
  }, [toast]);

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
              <Button
                text="Close"
                type="button"
                handleClick={handleCloseButtonClick}
              />
              <Button text="Save Changes" type="submit" />
            </>
          ) : (
            <Button text="Create Recipe" type="submit" />
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
      <Snackbar
        open={toast.open}
        autoHideDuration={6000}
        onClose={closeToast}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={closeToast}
          severity={toast.severity}
          sx={{ width: "100%", border: 1 }}
        >
          {toast.activeMessage}
        </Alert>
      </Snackbar>
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
  for (const [key, value] of Object.entries(data.instructions)) {
    newInstructions.push({ id: key, text: value });
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
