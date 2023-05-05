import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import Ingredient from "../../../utils/Ingredient";

export default function IngredientsList({ ingredients }) {
  return (
    <ul>
      {ingredients.map((str) => (
        <li key={uuidv4()}>{Ingredient.normalizeIngredientString(str, 1)}</li>
      ))}
    </ul>
  );
}

IngredientsList.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
};
