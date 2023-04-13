import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import NutrientInput from "./NutrientInput";
import { getNutrientsArrayFromObject } from "../../../../utils/formatScrapedRecipe";
import validNutrients from "../../../../utils/validNutrients";
import "./index.css";

export default function NutrientsList({ nutrients }) {
  const nutrientsArray = getNutrientsArrayFromObject(nutrients);

  return (
    <ul className="nutrients-list">
      {nutrientsArray.map((el) => {
        for (const validNutrient of validNutrients) {
          if (el.name === validNutrient.name) {
            return (
              <li key={uuidv4()}>
                <NutrientInput nutrient={el} />
              </li>
            );
          }
        }
        return false;
      })}
    </ul>
  );
}

NutrientsList.propTypes = {
  nutrients: PropTypes.object.isRequired,
};
