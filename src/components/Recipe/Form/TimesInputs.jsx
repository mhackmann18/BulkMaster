import PropTypes from "prop-types";
import NumberInput from "../../common/NumberInput";

export default function RecipeTimesInputs({ prepTime, cookTime }) {
  return (
    <>
      <label className="slate-gray" htmlFor="prep-time">
        Prep Time:{" "}
      </label>
      <NumberInput
        value={prepTime}
        setValue={() => null}
        minValue={0}
        maxValue={999}
        variant="no-spinner-wheel"
      />
      <select name="time-units" id="">
        <option value="minutes">Minutes</option>
        <option value="hours">Hours</option>
      </select>
      <label className="slate-gray" htmlFor="">
        Cook Time:{" "}
      </label>
      <NumberInput
        value={cookTime}
        setValue={() => null}
        minValue={0}
        maxValue={999}
      />
      <select name="time-units" id="">
        <option value="minutes">Minutes</option>
        <option value="hours">Hours</option>
      </select>
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
