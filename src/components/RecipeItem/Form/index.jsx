/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from "react-hook-form";
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
  const recipeStatus = recipe.title ? "existing" : "new";

  const onSubmit = (data) => console.log(data);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title,
      servings,
    },
  });

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
            {...register("title", {
              validate: RecipeValidator.getTitleErrMsg,
            })}
          />
        }
        subHeadingComponent={
          <>
            <ServingsInput
              errorMessage={errors.servings && errors.servings.message}
              {...register("servings", {
                validate: RecipeValidator.getServingsErrMsg,
              })}
            />
            <TimeInput
              name="prep-time"
              labelText="Prep Time"
              defaultValue={prepTime}
            />
            <TimeInput
              name="cook-time"
              labelText="Cook Time"
              defaultValue={cookTime}
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
