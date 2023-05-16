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
import Recipe from "../../../utils/Recipe";
import RecipeValidator from "../../../utils/RecipeValidator";

export default function RecipeForm({ startRecipe, handleCancelButtonClick }) {
  const [recipe, setRecipe] = useState(new Recipe({ ...startRecipe }));
  const [successToast, setSuccessToast] = useState({
    open: false,
    messages: [],
    activeMessage: "",
  });

  const closeSuccessToast = () => {
    setSuccessToast({ ...successToast, open: false });
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
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

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
                handleClick={handleCancelButtonClick}
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

RecipeForm.propTypes = {
  startRecipe: PropTypes.instanceOf(Recipe).isRequired,
  handleCancelButtonClick: PropTypes.func,
};

RecipeForm.defaultProps = {
  handleCancelButtonClick: () => null,
};
