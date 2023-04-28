import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import NutrientInput from "./NutrientInput";
// import validNutrients from "../../../../utils/validNutrients";
import "./index.css";

export default function NutrientsList({ nutrients }) {
  return (
    <ul className="nutrients-list">
      {nutrients.map((el) => (
        <li key={uuidv4()}>
          <NutrientInput nutrient={el} />
        </li>
      ))}
    </ul>
  );
}

NutrientsList.propTypes = {
  nutrients: PropTypes.arrayOf(PropTypes.string).isRequired,
};
