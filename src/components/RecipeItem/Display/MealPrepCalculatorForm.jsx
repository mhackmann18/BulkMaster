import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import { InputAdornment, TextField } from "@mui/material";
import "./MealPrepCalculatorForm.css";

export default function MealPrepCalculatorForm({
  recipeServingsCount,
  recipeCaloriesCount,
  recipeServingSize,
  onSubmit,
}) {
  function handleSubmit(e) {
    const oldServingsCount = recipeServingsCount;
    const oldCaloriesCount = recipeCaloriesCount;
    const newServingsCount = e.target["meals-quantity"].value;
    const newCaloriesCount = e.target["calories-per-meal"].value;
    const recipeMultiplier =
      (newServingsCount * newCaloriesCount) /
      (oldServingsCount * oldCaloriesCount);
    e.preventDefault();
    onSubmit(recipeMultiplier);
  }

  console.log(recipeServingSize);

  return (
    <form id="mpc-form" onSubmit={handleSubmit}>
      <header>
        <h2>Meal Prep Calculator</h2>
        <button id="mpc-info-btn" type="button">
          <FontAwesomeIcon icon={faCircleQuestion} />
        </button>
      </header>
      {/* <h3>Number of portions</h3> */}
      <div id="portions-quantity-container">
        <label htmlFor="portions-quantity">
          <h3>Number of Portions</h3>
        </label>
        <div className="portion-input-wrapper">
          <TextField
            name="portions-quantity"
            id="portions-quantity"
            // onChange={onChange}
            // onBlur={onBlur}
            defaultValue={recipeServingsCount}
            type="number"
            variant="outlined"
            size="small"
            fullWidth
            required
            // error={Boolean(errorMessage)}
            // helperText={errorMessage}
            // inputRef={ref}
          />
        </div>
      </div>
      <div id="portion-size-container">
        <div id="portion-size-header">
          <h3>Portion Size</h3>
          <div id="portion-size-buttons-container">
            <button className="active" type="button">
              By servings count
            </button>{" "}
            or <button type="button">By calorie content</button>
          </div>
        </div>

        <div className="portion-input-wrapper">
          <TextField
            name="portion-calorie-quantity"
            id="portion-calorie-quantity"
            // onChange={onChange}
            // onBlur={onBlur}
            defaultValue={recipeServingSize.quantity}
            type="number"
            variant="outlined"
            size="small"
            fullWidth
            required
            // error={Boolean(errorMessage)}
            // helperText={errorMessage}
            // inputRef={ref}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {recipeServingSize.unit}
                </InputAdornment>
              ),
            }}
          />
        </div>
        {/* <label htmlFor="portion-servings-quantity">
            By number of servings
          </label> */}
        {/* <div className="portion-size-input-wrapper">
            <TextField
              name="portion-servings-quantity"
              id="portion-servings-quantity"
              // onChange={onChange}
              // onBlur={onBlur}
              defaultValue={recipeServingSize.quantity}
              type="number"
              variant="outlined"
              size="small"
              fullWidth
              required
              // error={Boolean(errorMessage)}
              // helperText={errorMessage}
              // inputRef={ref}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {recipeServingSize.unit}
                  </InputAdornment>
                ),
                // inputProps: { min: minQuantity, max: maxQuantity },
              }}
            />
          </div> */}
      </div>
      <button id="mpc-submit-btn" className="btn-default" type="submit">
        Update Recipe
      </button>
    </form>
  );
}

MealPrepCalculatorForm.propTypes = {
  recipeServingsCount: PropTypes.number.isRequired,
  recipeCaloriesCount: PropTypes.number.isRequired,
  recipeServingSize: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
