import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import NutrientInput from "./NutrientInput";
import { getNutrientsArrayFromObject } from "../utils/formatScrapedRecipe";
import validNutrients from "../utils/validNutrients";
import "./NutrientsList.css";

export default function NutrientsList({ nutrients }) {
  console.log(nutrients);
  const servingSizeObject = { name: "Serving Size", unit: "" };
  const nutrientsArray = getNutrientsArrayFromObject(nutrients);

  return (
    <ul className="nutrients-list">
      {[servingSizeObject, ...validNutrients].map((el) => {
        const nutrientListItemObject = { ...el, quantity: 0 };

        for (const recipeNutrientObject of nutrientsArray) {
          if (el.name === recipeNutrientObject.name) {
            nutrientListItemObject.quantity = recipeNutrientObject.quantity;
          }
        }
        return (
          <li key={uuidv4()}>
            <NutrientInput nutrient={nutrientListItemObject} />
          </li>
        );
      })}
    </ul>
  );
}

NutrientsList.propTypes = {
  nutrients: PropTypes.object.isRequired,
};
