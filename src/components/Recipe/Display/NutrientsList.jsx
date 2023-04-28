import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
// import { getNutrientStringsFromObj } from "../../../utils/formatScrapedRecipe";
import "./NutrientsList.css";

export default function NutrientsList({
  nutrients,
  servingsCount,
  servingSize,
}) {
  // const nutrientsStrings = getNutrientStringsFromObj(nutrients);
  return (
    <ul id="nutrients-list">
      <li>
        <span className="bold">Servings:</span> {servingsCount},
      </li>
      <li>
        <span className="bold">Serving Size:</span> {servingSize},
      </li>
      {nutrients.map((el) => (
        <li key={uuidv4()}>{el},</li>
      ))}
    </ul>
  );
}

NutrientsList.propTypes = {
  nutrients: PropTypes.arrayOf(PropTypes.string).isRequired,
  servingsCount: PropTypes.number,
  servingSize: PropTypes.string,
};

NutrientsList.defaultProps = {
  servingsCount: 1,
  servingSize: "1 serving",
};
