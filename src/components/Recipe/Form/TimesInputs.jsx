import PropTypes from "prop-types";
import NumberInput from "./NumberInput";
import "./TimesInputs.css";

export default function RecipeTimesInputs({ prepTime, cookTime }) {
  return (
    <>
      <div className="recipe-time-inputs-container">
        <label className="recipe-time-label slate-gray">Prep Time: </label>
        <NumberInput
          startingValue={prepTime}
          setValue={() => null}
          minValue={0}
          maxValue={999}
          variant="no-spinner-wheel"
          name="prep-time-number"
        />
        <select name="prep-time-units">
          <option value="minutes">minutes</option>
          <option value="hours">hours</option>
        </select>
      </div>
      <div className="recipe-time-inputs-container">
        <label className="recipe-time-label slate-gray" htmlFor="">
          Cook Time:{" "}
        </label>
        <NumberInput
          startingValue={cookTime}
          setValue={() => null}
          minValue={0}
          maxValue={999}
          name="cook-time-number"
        />
        <select name="cook-time-units" id="">
          <option value="minutes">minutes</option>
          <option value="hours">hours</option>
        </select>
      </div>
    </>
  );
}

RecipeTimesInputs.propTypes = {
  prepTime: PropTypes.number,
  cookTime: PropTypes.number,
};

RecipeTimesInputs.defaultProps = {
  prepTime: 0,
  cookTime: 0,
};
