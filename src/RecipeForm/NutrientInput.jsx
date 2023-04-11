import PropTypes from "prop-types";
import NumberInput from "./NumberInput";

export default function NutrientInput({ nutrient }) {
  const { name, quantity, unit } = nutrient;

  return (
    <>
      {name}
      <NumberInput
        startingValue={quantity}
        maxValue={9999}
        minValue={0}
        variant="no-spinner-wheel"
        title="Quantity"
        name={name.toLowerCase()}
        id={name.toLowerCase()}
      />{" "}
      {unit}
    </>
  );
}

NutrientInput.propTypes = {
  nutrient: PropTypes.shape({
    name: PropTypes.string.isRequired,
    quantity: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])])
      .isRequired,
    unit: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])])
      .isRequired,
  }).isRequired,
};
