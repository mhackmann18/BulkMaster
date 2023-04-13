import PropTypes from "prop-types";
import NumberInput from "./NumberInput";
import "./ServingInputs.css";

export default function ServingInputs({ servingSize, servings }) {
  return (
    <div id="serving-size-inputs">
      <label>Serving Size: </label>
      <NumberInput
        startingValue={servingSize.quantity}
        maxValue={99}
        minValue={1}
        variant="no-spinner-wheel"
        name="serving-size-quantity"
      />
      <input
        type="text"
        name="serving-size-unit"
        defaultValue={servingSize.unit}
      />
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
  servingSize: PropTypes.object,
  servings: PropTypes.number,
};

ServingInputs.defaultProps = {
  servingSize: {
    quantity: "",
    unit: "",
  },
  servings: 1,
};
