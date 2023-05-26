import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import { InputAdornment, TextField } from "@mui/material";
import "./MealPrepCalculatorForm.css";

export default function MealPrepCalculatorForm({
  recipeServingsCount,
  recipeCaloriesCount,
  // onCancelClick,
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

  return (
    <form id="mpc-form" onSubmit={handleSubmit}>
      <header>
        <h2>Meal Prep Calculator</h2>
        <button id="mpc-info-btn" type="button">
          <FontAwesomeIcon icon={faCircleQuestion} />
        </button>
      </header>
      {/* <h3>Number of portions</h3> */}
      <div id="portions-quantity-container" className="input-row ">
        <label htmlFor="portions-quantity">Portions Quantity</label>
        <div className="portions-quantity-input-wrapper">
          <TextField
            name="portions-quantity"
            id="portions-quantity"
            // onChange={onChange}
            // onBlur={onBlur}
            defaultValue={recipeServingsCount}
            type="number"
            variant="outlined"
            size="small"
            // fullWidth
            required
            // error={Boolean(errorMessage)}
            // helperText={errorMessage}
            // inputRef={ref}
          />
        </div>
      </div>
      <div id="portion-size-container">
        <h3>Portion Size</h3>
        <div className="input-row active">
          <label htmlFor="portion-calorie-quantity">By calorie content</label>
          <div className="portion-size-input-wrapper">
            <TextField
              name="portion-calorie-quantity"
              id="portion-calorie-quantity"
              // onChange={onChange}
              // onBlur={onBlur}
              defaultValue={recipeCaloriesCount}
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
                  <InputAdornment position="end">calories</InputAdornment>
                ),
                // inputProps: { min: minQuantity, max: maxQuantity },
              }}
            />
          </div>
        </div>
        <div className="separator">or</div>
        <div className="input-row">
          <label htmlFor="portion-servings-quantity">
            By number of servings
          </label>
          <div className="portion-size-input-wrapper">
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
          </div>
        </div>
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
  // onCancelClick: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
