import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleMinus } from "@fortawesome/free-solid-svg-icons";
import CookingUnitSelect from "./CookingUnitSelect";
import {
  standardFormUnits,
  standardFormUnitsPlural,
} from "../utils/cookingUnit";
import "./SubIngredient.css";

export default function SubIngredient({ subIngredient }) {
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
        <input
          type="number"
          className="no-spinner-wheel"
          defaultValue={quantity}
          min="0"
          max="999"
          name="ingredient-quantity"
          title="quantity"
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

SubIngredient.propTypes = {
  subIngredient: PropTypes.shape({
    quantity: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
    unit: PropTypes.oneOf([
      ...standardFormUnits,
      ...standardFormUnitsPlural,
      null,
    ]),
    str: PropTypes.string.isRequired,
  }).isRequired,
};
