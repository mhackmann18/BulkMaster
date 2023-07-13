/* eslint-disable react/jsx-props-no-spreading */
import { useState, useEffect } from "react";
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
import Recipe from "../../../utils/Recipe";
import RecipeValidator from "../../../utils/RecipeValidator";
import StandardModal from "../../common/StandardModal";
import ConfirmationDisplay from "../../common/ConfirmationDisplay";
import Toast from "../../common/Toast";
import useToast from "../../../hooks/useToast";
import User from "../../../utils/UserController";
import useUser from "../../../hooks/useUser";
import useHandleAuthError from "../../../hooks/useHandleAuthError";

export default function RecipeForm({ startRecipe, setStartRecipe, onCancel }) {
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
  const handleAuthError = useHandleAuthError();

  // eslint-disable-next-line no-nested-ternary
  const recipeStatus = title ? (id ? "existing" : "imported") : "new";

  const { user } = useUser();

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
    if (!startRecipe.isEquivalent(recipeData) && !isFormDirty) {
      setIsFormDirty(true);
    }
    if (startRecipe.isEquivalent(recipeData) && isFormDirty) {
      setIsFormDirty(false);
    }
  }, [watch()]);

  const handleCloseButtonClick = () => {
    const recipeData = Recipe.parseFormData(watch(), id);

    if (!startRecipe.isEquivalent(recipeData)) {
      setCloseFormModalOpen(true);
    } else {
      onCancel();
    }
  };

  const onSubmit = async (formData) => {
    const recipeData = Recipe.parseFormData(formData, id);

    if (recipeData.error) {
      addErrorToastMessage(recipeData.error);

      // Recipe is custom
    } else if (recipeStatus === "new") {
      const { data, error, message } = await User.saveRecipe(recipeData, user);

      handleAuthError(error);

      if (data) {
        addSuccessToastMessage("New recipe added to library");
      } else if (error) {
        addErrorToastMessage(
          `Unable to save recipe. ${message || "An unexpected error occurred"}`
        );
      }
      // Recipe is being edited
    } else if (recipeStatus === "existing" && isFormDirty) {
      const { data, error, message } = await User.updateRecipe(recipeData, id);

      handleAuthError(error);

      if (data) {
        addSuccessToastMessage("Recipe updated");
        setStartRecipe(new Recipe({ ...recipeData }));
      } else if (error) {
        addErrorToastMessage(
          `Unable to update recipe. ${
            message || "An unexpected error occurred"
          }`
        );
      }

      // Recipe is imported
    } else if (recipeStatus === "imported" && isFormDirty) {
      setStartRecipe(new Recipe({ ...recipeData }));
      addSuccessToastMessage("Changes saved");
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
          recipeStatus === "existing" || recipeStatus === "imported" ? (
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
              addSuccessToastMessage("Instructions step deleted");
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

RecipeForm.propTypes = {
  startRecipe: PropTypes.instanceOf(Recipe).isRequired,
  onCancel: PropTypes.func,
  setStartRecipe: PropTypes.func.isRequired,
};

RecipeForm.defaultProps = {
  onCancel: () => null,
};
