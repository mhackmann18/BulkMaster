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

export default function RecipeForm({ startRecipe, onCancel }) {
  const [recipe, setRecipe] = useState(new Recipe({ ...startRecipe }));
  const [closeFormModalOpen, setCloseFormModalOpen] = useState(false);
  const [successToast, setSuccessToast] = useState({
    open: false,
    messages: [],
    activeMessage: "",
  });

  const closeSuccessToast = () => {
    setSuccessToast({ ...successToast, open: false });
  };

  const closeFormModal = () => {
    setCloseFormModalOpen(false);
  };

  useEffect(() => {
    if (!successToast.open && successToast.messages.length) {
      setSuccessToast({
        open: true,
        activeMessage: successToast.messages[0],
        messages: successToast.messages.slice(1),
      });
    } else if (successToast.open && successToast.messages.length) {
      setSuccessToast({ ...successToast, open: false });
    }
  }, [successToast]);

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

  const recipeStatus = title ? "existing" : "new";

  const {
    handleSubmit,
    register,
    unregister,
    watch,
    formState: { errors, isDirty },
  } = useForm();

  const handleCancelClick = () => {
    if (isDirty) {
      setCloseFormModalOpen(true);
    } else {
      onCancel();
    }
  };

  const onSubmit = (data) => {
    console.log(getRecipeFromFormData(data));
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
                text="Cancel"
                type="button"
                handleClick={handleCancelClick}
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
            onDeleteIngredient={(id, successMessage) => {
              unregister(`ingredients.${id}`);
              recipe.removeIngredientById(id);
              setRecipe(new Recipe({ ...recipe }));
              setSuccessToast({
                ...successToast,
                messages: [...successToast.messages, successMessage],
              });
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
            onInstructionRemoveClick={(id) => {
              unregister(`instructions.${id}`);
              recipe.removeInstructionById(id);
              setRecipe(new Recipe({ ...recipe }));
              setSuccessToast({
                ...successToast,
                messages: [
                  ...successToast.messages,
                  `Instruction step deleted successfully`,
                ],
              });
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
          messageText="You have made unsaved changes. Do you want to save or discard them?"
          cancelBtnText="Discard"
          onCancel={onCancel}
          confirmBtnText="Save"
          onConfirm={closeFormModal}
        />
      </StandardModal>
      <Snackbar
        open={successToast.open}
        autoHideDuration={6000}
        onClose={closeSuccessToast}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={closeSuccessToast}
          severity="success"
          sx={{ width: "100%", border: 1 }}
        >
          {successToast.activeMessage}
        </Alert>
      </Snackbar>
    </form>
  );
}

function getRecipeFromFormData(data) {
  const newIngredients = [];
  for (const [key, value] of Object.entries(data.ingredients)) {
    newIngredients.push({
      id: key,
      quantity: Number(value.quantity),
      unit: value.unit,
      name: value.unit,
    });
  }

  if (!newIngredients.length) {
    console.log("Must have at least one ingredient");
  }

  const newInstructions = [];
  for (const [key, value] of Object.entries(data.instructions)) {
    newInstructions.push({ id: key, text: value });
  }

  const newNutrients = {};
  for (const [name, value] of Object.entries(data.nutrients)) {
    if (value) {
      newNutrients[name] = {
        quantity: Number(value),
        unit: nutrientUnits[name],
      };
    }
  }

  let newServingSize;
  if (data.servingSize.quantity || data.servingSize.unit) {
    newServingSize = {
      quantity: Number(data.servingSize.quantity),
      unit: data.servingSize.unit || null,
    };
  } else {
    newServingSize = null;
  }

  return new Recipe({
    // id: startRecipe.id,
    title: data.title,
    servings: Number(data.servings),
    prepTime: Number(data.prepTime),
    cookTime: Number(data.cookTime),
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
