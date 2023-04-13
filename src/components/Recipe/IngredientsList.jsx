import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { getNewIngredientString } from "../../utils/formatScrapedRecipe";

export default function IngredientsList({ ingredients }) {
  return (
    <ul>
      {ingredients.map((el) => (
        <li key={uuidv4()}>{getNewIngredientString(el, 1)}</li>
      ))}
    </ul>
  );
}

IngredientsList.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
};
