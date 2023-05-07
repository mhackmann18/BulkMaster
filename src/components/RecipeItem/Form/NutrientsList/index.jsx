import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import NutrientInput from "./NutrientInput";
import Nutrient from "../../../../utils/Nutrient";
import "./index.css";

export default function NutrientsList({ nutrients }) {
  const nutrientsObjects = nutrients.length
    ? nutrients
    : [new Nutrient({ quantity: 0, name: "", unit: "" })];

  return (
    <ul className="nutrients-list">
      {nutrientsObjects.map((nutrient) => (
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
