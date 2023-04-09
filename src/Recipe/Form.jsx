import PropTypes from "prop-types";
import NumberInput from "../common/NumberInput";
import "./Form.css";

export default function Form({
  servingsDefaultValue,
  servingsInputValue,
  setServingsInputValue,
  caloriesDefaultValue,
  caloriesInputValue,
  setCaloriesInputValue,
}) {
  const servingsInputMaxValue = 99;
  const servingsInputMinValue = 1;
  const caloriesInputMaxValue = 9999;
  const caloriesInputMinValue = 1;

  // If the input's value is no longer the starting value, display the reset button
  const resetBtnActive =
    servingsDefaultValue !== servingsInputValue ||
    caloriesDefaultValue !== caloriesInputValue;

  function handleResetBtnClick(e) {
    e.preventDefault();
    setServingsInputValue(servingsDefaultValue);
    if (caloriesDefaultValue) {
      setCaloriesInputValue(caloriesDefaultValue);
    }
  }

  return (
    <form id="edit-recipe-form">
      <div className="left">
        <label htmlFor="servings">Servings</label>
        <NumberInput
          value={servingsInputValue}
          setValue={setServingsInputValue}
          maxValue={servingsInputMaxValue}
          minValue={servingsInputMinValue}
        />
        {caloriesDefaultValue && (
          <>
            <label htmlFor="">Calories per serving</label>
            <NumberInput
              value={caloriesInputValue}
              setValue={setCaloriesInputValue}
              maxValue={caloriesInputMaxValue}
              minValue={caloriesInputMinValue}
              variant="no-spinner-wheel"
            />
          </>
        )}
        {resetBtnActive && (
          <button onClick={handleResetBtnClick} type="button">
            Reset
          </button>
        )}
      </div>
      <div className="right">
        <button type="button" onClick={(e) => e.preventDefault()}>
          Edit
        </button>
        <button type="submit" onClick={(e) => e.preventDefault()}>
          Save
        </button>
      </div>
    </form>
  );
}

Form.propTypes = {
  servingsDefaultValue: PropTypes.number.isRequired,
  servingsInputValue: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf([""]),
  ]).isRequired,
  setServingsInputValue: PropTypes.func.isRequired,
  caloriesDefaultValue: PropTypes.number.isRequired,
  caloriesInputValue: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf([""]),
  ]).isRequired,
  setCaloriesInputValue: PropTypes.func.isRequired,
};
