import PropTypes from "prop-types";
import NumberInput from "../common/NumberInput";

export default function RecipeTimesInputs({ prepTime, cookTime }) {
  return (
    <div>
      <label htmlFor="prep-time">Prep Time: </label>
      <NumberInput
        value={prepTime}
        setValue={() => {}}
        minValue={0}
        maxValue={999}
      />
      <select name="time-units" id="">
        <option value="minutes">Minutes</option>
        <option value="hours">Hours</option>
      </select>
      <label htmlFor="">Cook Time: </label>
      <NumberInput
        value={cookTime}
        setValue={() => {}}
        minValue={0}
        maxValue={999}
      />
      <select name="time-units" id="">
        <option value="minutes">Minutes</option>
        <option value="hours">Hours</option>
      </select>
    </div>
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
