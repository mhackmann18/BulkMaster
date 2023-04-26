import PropTypes from "prop-types";
import NumberInput from "../../common/NumberInput";
import "./TimesInputs.css";

export default function RecipeTimesInputs({ prepTime, cookTime }) {
  return (
    <>
      <div className="recipe-time-inputs-container">
        <label className="recipe-time-label slate-gray">Prep Time: </label>
        <NumberInput
          value={prepTime}
          setValue={() => null}
          minValue={0}
          maxValue={999}
          variant="no-spinner-wheel"
        />
        <select name="time-units">
          <option value="minutes">Minutes</option>
          <option value="hours">Hours</option>
        </select>
      </div>
      <div className="recipe-time-inputs-container">
        <label className="recipe-time-label slate-gray" htmlFor="">
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
