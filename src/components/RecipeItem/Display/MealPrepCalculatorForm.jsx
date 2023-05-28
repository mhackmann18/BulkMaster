/* eslint-disable react/jsx-props-no-spreading */
import { useState } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import { InputAdornment, TextField, Popper } from "@mui/material";
import RecipeValidator from "../../../utils/RecipeValidator";
import "./MealPrepCalculatorForm.css";

export default function MealPrepCalculatorForm({
  recipeServingsCount,
  recipeCaloriesCount,
  recipeServingSize,
  // updateRecipe
}) {
  const [mealSizeInput, setMealSize] = useState("servings");
  const [popperAnchorEl, setPopperAnchorEl] = useState(null);
  const popperOpen = Boolean(popperAnchorEl);

  const {
    register,
    unregister,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleInfoClick = (e) => {
    setPopperAnchorEl(popperAnchorEl ? null : e.currentTarget);
  };

  const onSubmit = (data) => {
    const mealsCount = data["meals-quantity"];
    const caloriesPerMeal = data["meal-calories-quantity"];
    const servingsPerMeal = data["meal-servings-quantity"];

    const nutrientsMult = caloriesPerMeal
      ? caloriesPerMeal / recipeCaloriesCount
      : servingsPerMeal / recipeServingSize.quantity;

    const ingredientsMult = (mealsCount / recipeServingsCount) * nutrientsMult;

    console.log(`Set servings to ${mealsCount}`);
    console.log(`Multiply ingredients by ${ingredientsMult}`);
    console.log(`Multiply nutrients by ${nutrientsMult}`);
  };

  return (
    <>
      <form id="mpc-form" onSubmit={handleSubmit(onSubmit)}>
        <header>
          <h2>Meal Prep Calculator</h2>
          <FontAwesomeIcon
            id="mpc-help-icon"
            icon={faCircleQuestion}
            size="lg"
            onMouseEnter={handleInfoClick}
            onMouseLeave={() => setPopperAnchorEl(null)}
          />
        </header>
        <div id="meals-quantity-container">
          <label htmlFor="meals-quantity">
            <h3>Number of Meals</h3>
          </label>
          <div className="meal-input-wrapper">
            <TextField
              id="meals-quantity"
              defaultValue={recipeServingsCount}
              type="number"
              variant="outlined"
              size="small"
              fullWidth
              {...register("meals-quantity", {
                validate: RecipeValidator.getServingsErrMsg,
              })}
              error={Boolean(errors && errors["meals-quantity"])}
              helperText={
                errors && errors["meals-quantity"]
                  ? errors["meals-quantity"].message
                  : ""
              }
            />
          </div>
        </div>
        <div id="meal-size-container">
          <div id="meal-size-header">
            <label htmlFor="meal-size">
              <h3>Meal Size</h3>
            </label>
            <div id="meal-size-buttons-container">
              <button
                onClick={() => {
                  unregister("meal-calories-quantity");
                  setMealSize("servings");
                }}
                className={mealSizeInput === "servings" ? "active" : ""}
                type="button"
              >
                By servings count
              </button>
              {recipeCaloriesCount && (
                <button
                  onClick={() => {
                    unregister("meal-servings-quantity");
                    setMealSize("calories");
                  }}
                  className={mealSizeInput === "calories" ? "active" : ""}
                  type="button"
                >
                  By calorie content
                </button>
              )}
            </div>
          </div>
          {mealSizeInput === "calories" ? (
            <div className="meal-input-wrapper" key={1}>
              <TextField
                id="meal-size"
                defaultValue={recipeCaloriesCount}
                type="number"
                variant="outlined"
                size="small"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">calories</InputAdornment>
                  ),
                }}
                {...register("meal-calories-quantity", {
                  validate: (str) =>
                    RecipeValidator.getNumberErrMsg(
                      str,
                      RecipeValidator.nutrientQuantityMaxValue,
                      1,
                      true
                    ),
                })}
                error={Boolean(errors && errors["meal-calories-quantity"])}
                helperText={
                  errors && errors["meal-calories-quantity"]
                    ? errors["meal-calories-quantity"].message
                    : ""
                }
              />
            </div>
          ) : (
            <div className="meal-input-wrapper" key={2}>
              <TextField
                id="meal-size"
                defaultValue={recipeServingSize.quantity}
                type="number"
                variant="outlined"
                size="small"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {recipeServingSize.unit}
                    </InputAdornment>
                  ),
                }}
                {...register("meal-servings-quantity", {
                  validate: (str) =>
                    RecipeValidator.getServingSizeQuantityErrMsg(str, true),
                })}
                error={Boolean(errors && errors["meal-servings-quantity"])}
                helperText={
                  errors && errors["meal-servings-quantity"]
                    ? errors["meal-servings-quantity"].message
                    : ""
                }
              />
            </div>
          )}
        </div>
        <button id="mpc-submit-btn" className="btn-default" type="submit">
          Update Recipe
        </button>
      </form>
      <Popper open={popperOpen} anchorEl={popperAnchorEl} disablePortal>
        <div id="mpc-info-tip">
          The meal prep calculator will update this recipe&apos;s ingredients
          and nutrition facts to reflect the number of meals and meal size
          provided.
        </div>
      </Popper>
    </>
  );
}

MealPrepCalculatorForm.propTypes = {
  recipeServingsCount: PropTypes.number.isRequired,
  recipeCaloriesCount: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf([null]),
  ]),
  recipeServingSize: PropTypes.object.isRequired,
  // updateRecipe: PropTypes.func.isRequired
};

MealPrepCalculatorForm.defaultProps = {
  recipeCaloriesCount: null,
};
