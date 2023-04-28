import PropTypes from "prop-types";
import NumberInput from "./NumberInput";
import "./ServingInputs.css";

export default function ServingInputs({ servingSize, servings }) {
  function getQuantityFromServingsString(str) {
    const numRE = /^([1-9][0-9]*|0)((\/[1-9][0-9]*)|(\.[0-9]*))?($|\s)/;
    const match = str.match(numRE);

    let unit = servingSize.replace(numRE, "");
    unit = unit.trim();

    return { quantity: match ? Number(match[0]) : "", unit };
  }

  const { quantity, unit } = getQuantityFromServingsString(servingSize);

  return (
    <div id="serving-size-inputs">
      <label>Serving Size: </label>
      <NumberInput
        startingValue={quantity}
        maxValue={99}
        minValue={1}
        variant="no-spinner-wheel"
        name="serving-size-quantity"
      />
      <input type="text" name="serving-size-unit" defaultValue={unit} />
      <label htmlFor="servings">Servings: </label>
      <NumberInput
        startingValue={servings}
        maxValue={99}
        minValue={1}
        variant="no-spinner-wheel"
        title="Number of Servings"
        name="servings"
        id="servings"
      />
    </div>
  );
}

ServingInputs.propTypes = {
  servingSize: PropTypes.string,
  servings: PropTypes.number,
};

ServingInputs.defaultProps = {
  servingSize: "",
  servings: 1,
};
