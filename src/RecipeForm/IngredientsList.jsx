import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { getNewIngredientString } from "../utils/formatScrapedRecipe";
import IngredientsListItem from "./IngredientsListItem";

export default function IngredientsList({ ingredients }) {
  return (
    <ul id="ingredients-list">
      {/* <span className="labels">
        <label className="quantity-label">Count</label>
        <label className="unit-label">Unit</label>
        <label>Name</label>
      </span> */}
      {ingredients.length ? (
        ingredients.map((el) => (
          <IngredientsListItem
            key={uuidv4()}
            ingredient={getNewIngredientString(el)}
          />
        ))
      ) : (
        <IngredientsListItem ingredient="" />
      )}
    </ul>
  );
}

IngredientsList.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
};
