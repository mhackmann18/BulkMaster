/* eslint-disable react/jsx-props-no-spreading */
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import RecipeContainer from "../RecipeContainer";
import TitleInput from "./TitleInput";
import ServingsInput from "./ServingsInput";
import TimeInput from "./TimeInput";
import AddButton from "./AddButton";
import InstructionsList from "./InstructionsList";
import IngredientInputsList from "./IngredientsList";
import ServingSizeInput from "./ServingSizeInput";
import NutrientsList from "./NutrientsList";
import Recipe from "../../../utils/Recipe";
import RecipeValidator from "../../../utils/RecipeValidator";
import StandardModal from "../../common/StandardModal";
import ConfirmationDisplay from "../../common/ConfirmationDisplay";
import Toast from "../../common/Toast";
import useToast from "../../../hooks/useToast";

export default function RecipeForm({
  rootRecipe,
  buttonsComponent,
  onCancel,
  onSubmit,
}) {
  const [recipe, setRecipe] = useState(new Recipe({ ...rootRecipe }));
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

  const [isFormDirty, setIsFormDirty] = useState(false);

  useEffect(() => {
    const recipeData = Recipe.parseFormData(watch(), id);
    if (!rootRecipe.isEquivalent(recipeData) && !isFormDirty) {
      setIsFormDirty(true);
    }
    if (rootRecipe.isEquivalent(recipeData) && isFormDirty) {
      setIsFormDirty(false);
    }
  }, [watch()]);

  const handleCloseButtonClick = () => {
    const recipeData = Recipe.parseFormData(watch(), id);

    if (!rootRecipe.isEquivalent(recipeData)) {
      setCloseFormModalOpen(true);
    } else {
      onCancel();
    }
  };

  const onFormSubmit = (formData) => {
    if (isFormDirty) {
      const recipeData = Recipe.parseFormData(formData, id);

      if (recipeData.error) {
        addErrorToastMessage(recipeData.error);
        return false;
      }

      onSubmit(recipeData);
    }
  };

  return (
    <form
      id="recipe"
      className="form-style"
      onSubmit={handleSubmit(onFormSubmit)}
      noValidate
    >
      <RecipeContainer
        titleComponent={
          <TitleInput
            errorMessage={errors.title?.message}
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
              errorMessage={errors.servings?.message}
              {...register("servings", {
                validate: RecipeValidator.getServingsErrMsg,
              })}
            />
            <TimeInput
              labelText="Prep Time"
              startValue={prepTime}
              errorMessage={errors.prepTime?.message}
              {...register("prepTime", {
                validate: RecipeValidator.getTimeErrMsg,
                required: false,
              })}
            />
            <TimeInput
              labelText="Cook Time"
              startValue={cookTime}
              errorMessage={errors.cookTime?.message}
              {...register("cookTime", {
                validate: RecipeValidator.getTimeErrMsg,
                required: false,
              })}
            />
          </>
        }
        buttonsComponent={
          buttonsComponent || (
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
              <button
                type="submit"
                className={`btn-default${isFormDirty ? "" : " inactive"}`}
              >
                <FontAwesomeIcon
                  icon={faCheck}
                  className="button-panel-icon"
                  size="sm"
                />
                Save Changes
              </button>
            </>
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
              addSuccessToastMessage("Instructions step deleted");
            }}
            register={register}
            watch={watch}
            errors={errors.instructions}
          />
        }
        nutrientsComponent={
          <>
            <ServingSizeInput
              servingSize={servingSize}
              register={register}
              servingSizeErrors={errors.servingSize}
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

RecipeForm.propTypes = {
  rootRecipe: PropTypes.instanceOf(Recipe).isRequired,
  onCancel: PropTypes.func,
  buttonsComponent: PropTypes.element,
  onSubmit: PropTypes.func.isRequired,
};

RecipeForm.defaultProps = {
  onCancel: () => null,
  buttonsComponent: null,
};
