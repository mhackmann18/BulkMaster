import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { getNutrientStringsFromObj } from "../../utils/formatScrapedRecipe";
import "./NutrientsList.css";

export default function NutrientsList({ nutrients, servings }) {
  const nutrientsStrings = getNutrientStringsFromObj(nutrients);

  nutrientsStrings.splice(1, 0, `Servings: ${servings}`);

  return (
    <ul id="nutrients-list">
      {nutrientsStrings.map((el) => (
        <li key={uuidv4()}>{el},</li>
      ))}
    </ul>
  );
}

NutrientsList.propTypes = {
  nutrients: PropTypes.object.isRequired,
  servings: PropTypes.number.isRequired,
};
