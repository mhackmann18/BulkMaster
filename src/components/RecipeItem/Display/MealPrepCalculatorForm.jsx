import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { TextField } from "@mui/material";
import "./MealPrepCalculatorForm.css";

export default function MealPrepCalculatorForm({
  recipeServingsCount,
  recipeCaloriesCount,
  // onCancelClick,
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
    <form id="meal-prep-calculator-form" onSubmit={handleSubmit}>
      <header>
        <h2>Meal Prep Calculator</h2>
        <button id="mpc-info-btn" type="button">
          <FontAwesomeIcon icon={faQuestion} size="sm" />
        </button>
      </header>
      <div id="portions-quantity-container" className="input-row">
        <label htmlFor="portions-quantity">Number of portions</label>
        <TextField
          name="portions-quantity"
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
      <div id="portion-size-container">
        <p>Portion Size</p>
        <div className="portion-size-option-container input-row active">
          <label>By calorie content</label>{" "}
          <div className="portion-size-input-wrapper">
            <TextField
              name="portions-quantity"
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
        <div className="portion-size-option-container input-row">
          <label>By serving size</label>{" "}
          <div className="portion-size-input-wrapper">
            <TextField
              name="portions-quantity"
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
  // onCancelClick: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
