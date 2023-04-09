import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import {
  standardFormUnits,
  standardFormUnitsPlural,
} from "../utils/cookingUnit";
import "./CookingUnitSelect.css";

export default function CookingUnitSelect({ unit }) {
  return (
    <select
      className="cooking-unit"
      name="ingredient-unit"
      title="Unit"
      defaultValue={unit}
    >
      {standardFormUnits.includes(unit)
        ? ["", ...standardFormUnits].map((el) => (
            <option value={el} key={uuidv4()}>
              {el}
            </option>
          ))
        : ["", ...standardFormUnitsPlural].map((el) => (
            <option value={el} key={uuidv4()}>
              {el}
            </option>
          ))}
    </select>
  );
}

CookingUnitSelect.propTypes = {
  unit: PropTypes.oneOf(["", ...standardFormUnits, ...standardFormUnitsPlural])
    .isRequired,
};
