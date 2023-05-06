import PropTypes from "prop-types";
import Ingredient from "../../../../utils/Ingredient";
import IngredientsListItem from "./ListItem";

export default function IngredientInputsList({ ingredients }) {
  return (
    <ul id="ingredients-list">
      {ingredients.length ? (
        ingredients.map((ingredient) => (
          <IngredientsListItem key={ingredient.name} ingredient={ingredient} />
        ))
      ) : (
        <IngredientsListItem />
      )}
    </ul>
  );
}

IngredientInputsList.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.instanceOf(Ingredient)).isRequired,
};
