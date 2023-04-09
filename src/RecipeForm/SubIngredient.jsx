import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleMinus } from "@fortawesome/free-solid-svg-icons";
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
          max="999"
        />
        <select name="unit" defaultValue={unit}>
          {standardFormUnits.includes(unit)
            ? standardFormUnits.map((el) => (
                <option value={el} key={uuidv4()}>
                  {el}
                </option>
              ))
            : standardFormUnitsPlural.map((el) => (
                <option value={el} key={uuidv4()}>
                  {el}
                </option>
              ))}
        </select>
        <input type="text" defaultValue={str} />
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
