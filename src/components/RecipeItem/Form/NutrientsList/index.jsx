import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import NutrientInput from "./NutrientInput";
// import validNutrients from "../../../../utils/validNutrients";
import Nutrient from "../../../../utils/Nutrient";
import "./index.css";

export default function NutrientsList({ nutrients }) {
  return (
    <ul className="nutrients-list">
      {nutrients.length &&
        nutrients.map((nutrient) => (
          <li key={uuidv4()}>
            <NutrientInput nutrient={nutrient} />
          </li>
        ))}
    </ul>
  );
}

NutrientsList.propTypes = {
  nutrients: PropTypes.arrayOf(PropTypes.instanceOf(Nutrient)).isRequired,
};
