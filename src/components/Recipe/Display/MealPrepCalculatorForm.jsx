import PropTypes from "prop-types";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import NumberInput from "../Form/NumberInput";
import "./MealPrepCalculatorForm.css";

export default function MealPrepCalculatorForm({
  recipeServingsCount,
  recipeCaloriesCount,
  onCancelClick,
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
        {/* <button type="button" title="Info">
                <FontAwesomeIcon icon={faCircleQuestion} />
              </button> */}
      </header>
      <p>How many meals should this recipe yield?</p>
      <label htmlFor="meals-quantity">Number of meals:</label>
      <NumberInput
        minValue={1}
        maxValue={99}
        name="meals-quantity"
        id="meals-quantity"
        variant="input-default"
      />
      <p>What is the desired portion size for each meal?</p>
      <label htmlFor="calories-per-meal">By calorie content:</label>
      <NumberInput
        minValue={0}
        maxValue={9999}
        name="calories-per-meal"
        id="calories-per-meal"
        variant="input-default"
      />
      <div className="separator">or</div>
      <label htmlFor="calories-per-meal">By serving size:</label>
      <NumberInput
        minValue={0}
        maxValue={9999}
        name="calories-per-meal"
        id="calories-per-meal"
        variant="input-default"
      />
      <div className="buttons-container">
        <button className="btn-no-bg" onClick={onCancelClick} type="button">
          Cancel
        </button>
        <button className="btn-default" type="submit">
          Update Recipe
        </button>
      </div>
    </form>
  );
}

MealPrepCalculatorForm.propTypes = {
  recipeServingsCount: PropTypes.number.isRequired,
  recipeCaloriesCount: PropTypes.number.isRequired,
  onCancelClick: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
