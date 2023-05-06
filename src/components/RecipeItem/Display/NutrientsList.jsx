import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
// import { getNutrientStringsFromObj } from "../../../utils/formatScrapedRecipe";
import "./NutrientsList.css";

export default function NutrientsList({ nutrients, servingSize }) {
  // const nutrientsStrings = getNutrientStringsFromObj(nutrients);
  return (
    <ul id="nutrients-list">
      <li>Serving Size: {servingSize},</li>
      {nutrients.map((el, i) =>
        i !== nutrients.length - 1 ? (
          <li key={uuidv4()}>{el},</li>
        ) : (
          <li key={uuidv4()}>{el}</li>
        )
      )}
    </ul>
  );
}

NutrientsList.propTypes = {
  nutrients: PropTypes.arrayOf(PropTypes.string).isRequired,
  servingSize: PropTypes.string,
};

NutrientsList.defaultProps = {
  servingSize: "1 serving",
};
