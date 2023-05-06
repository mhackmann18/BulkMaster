import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

export default function IngredientsList({ ingredients }) {
  return (
    <ul>
      {ingredients.map((str) => (
        <li key={uuidv4()}>{str}</li>
      ))}
    </ul>
  );
}

IngredientsList.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
};
