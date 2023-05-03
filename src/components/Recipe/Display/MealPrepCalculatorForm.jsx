// import PropTypes from "prop-types";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import NumberInput from "../Form/NumberInput";
import "./MealPrepCalculatorForm.css";

export default function MealPrepCalculatorForm() {
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <form id="meal-prep-calculator-form" onSubmit={handleSubmit}>
      <header>
        <h2>Meal Prep Calculator</h2>
        {/* <button type="button" title="Info">
                <FontAwesomeIcon icon={faCircleQuestion} />
              </button> */}
      </header>
      <p>How many meals are you preparing?</p>
      <label htmlFor="meals-quantity">Number of Meals:</label>
      <NumberInput
        minValue={1}
        maxValue={99}
        name="meals-quantity"
        id="meals-quantity"
        variant="input-default"
      />
      <p>How many calories should each meal contain?</p>
      <label htmlFor="calories-per-meal">Calories per Meal:</label>
      <NumberInput
        minValue={0}
        maxValue={9999}
        name="calories-per-meal"
        id="calories-per-meal"
        variant="input-default"
      />
      <div className="buttons-container">
        <button className="btn-no-bg" onClick={() => {}} type="button">
          Cancel
        </button>
        <button className="btn-default" type="submit">
          Update Recipe
        </button>
      </div>
    </form>
  );
}
