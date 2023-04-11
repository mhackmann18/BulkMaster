import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleMinus } from "@fortawesome/free-solid-svg-icons";
import NumberInput from "./NumberInput";
import CookingUnitSelect from "./CookingUnitSelect";
import { standardFormUnits } from "../utils/cookingUnit";
import "./IngredientsListItemRow.css";

export default function IngredientsListItemRow({ subIngredient }) {
  const { quantity, unit, str } = subIngredient;

  return (
    <div className="sub-ingredient">
      <FontAwesomeIcon
        icon={faCircleMinus}
        size="lg"
        className="btn remove"
        title="Remove Ingredient"
      />
      <div className="inputs">
        <NumberInput
          startingValue={quantity}
          minValue={0}
          maxValue={999}
          variant="no-spinner-wheel"
          title="Quantity"
          name="ingredient-quantity"
        />
        <CookingUnitSelect unit={unit || ""} />
        <input
          name="ingredient-name"
          title="Name"
          type="text"
          defaultValue={str}
        />
      </div>
    </div>
  );
}

IngredientsListItemRow.propTypes = {
  subIngredient: PropTypes.shape({
    quantity: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
    unit: PropTypes.oneOf([...standardFormUnits, null]),
    str: PropTypes.string.isRequired,
  }).isRequired,
};
