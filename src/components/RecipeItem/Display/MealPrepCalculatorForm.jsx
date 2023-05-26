import { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import { InputAdornment, TextField, Popper } from "@mui/material";
import "./MealPrepCalculatorForm.css";

export default function MealPrepCalculatorForm({
  recipeServingsCount,
  recipeCaloriesCount,
  recipeServingSize,
  onSubmit,
}) {
  const [portionSizeInput, setPortionSizeInput] = useState("servings");
  const [popperAnchorEl, setPopperAnchorEl] = useState(null);
  const popperOpen = Boolean(popperAnchorEl);

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

  const handleInfoClick = (e) => {
    setPopperAnchorEl(popperAnchorEl ? null : e.currentTarget);
    console.log(popperOpen);
  };

  return (
    <>
      <form id="mpc-form" onSubmit={handleSubmit}>
        <header>
          <h2>Meal Prep Calculator</h2>
          <button onClick={handleInfoClick} id="mpc-info-btn" type="button">
            <FontAwesomeIcon icon={faCircleQuestion} />
          </button>
        </header>
        <div id="portions-quantity-container">
          <label htmlFor="portions-quantity">
            <h3>Number of Portions</h3>
          </label>
          <div className="portion-input-wrapper">
            <TextField
              name="portions-quantity"
              id="portions-quantity"
              defaultValue={recipeServingsCount}
              type="number"
              variant="outlined"
              size="small"
              fullWidth
              required
            />
          </div>
        </div>
        <div id="portion-size-container">
          <div id="portion-size-header">
            <label htmlFor="portion-size">
              <h3>Portion Size</h3>
            </label>
            <div id="portion-size-buttons-container">
              <button
                onClick={() => setPortionSizeInput("servings")}
                className={portionSizeInput === "servings" ? "active" : ""}
                type="button"
              >
                By servings count
              </button>
              <button
                onClick={() => setPortionSizeInput("calories")}
                className={portionSizeInput === "calories" ? "active" : ""}
                type="button"
              >
                By calorie content
              </button>
            </div>
          </div>
          {portionSizeInput === "calories" ? (
            <div className="portion-input-wrapper" key={1}>
              <TextField
                name="portion-calorie-quantity"
                id="portion-size"
                defaultValue={recipeCaloriesCount}
                type="number"
                variant="outlined"
                size="small"
                fullWidth
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">calories</InputAdornment>
                  ),
                }}
              />
            </div>
          ) : (
            <div className="portion-input-wrapper" key={2}>
              <TextField
                name="portion-servings-quantity"
                id="portion-size"
                defaultValue={recipeServingSize.quantity}
                type="number"
                variant="outlined"
                size="small"
                fullWidth
                required
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
          )}
        </div>
        <button id="mpc-submit-btn" className="btn-default" type="submit">
          Update Recipe
        </button>
      </form>
      <Popper
        id="mpc-info-tip"
        open={popperOpen}
        anchorEl={popperAnchorEl}
        disablePortal
      >
        <div>dfsafsfdfsafsfdfsafsfdfsafsfdfsafsfdfsafsf</div>
      </Popper>
    </>
  );
}

MealPrepCalculatorForm.propTypes = {
  recipeServingsCount: PropTypes.number.isRequired,
  recipeCaloriesCount: PropTypes.number.isRequired,
  recipeServingSize: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
