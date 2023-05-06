import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import NumberInput from "../NumberInput";
import Nutrient from "../../../../utils/Nutrient";
// import { getNutrientObjectFromString } from "../../../../utils/formatScrapedRecipe";

export default function NutrientInput({ nutrient }) {
  const { name, quantity, unit } = nutrient;

  return (
    <>
      <label htmlFor={name.toLowerCase()}>{name}: </label>
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
      <FontAwesomeIcon
        icon={faXmark}
        size="lg"
        className="btn"
        title="Remove Nutrient"
      />
    </>
  );
}

NutrientInput.propTypes = {
  nutrient: PropTypes.instanceOf(Nutrient).isRequired,
};
