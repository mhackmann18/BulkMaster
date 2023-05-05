import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import IngredientsListItemRow from "./ListItemRow";
import Ingredient from "../../../../utils/Ingredient";

export default function IngredientsListItem({ ingredient }) {
  const ing = new Ingredient(ingredient);
  const ingredientObjects = ing.getIngredientObjects();

  return (
    <li>
      {ingredientObjects.length &&
        ingredientObjects.map((el) => (
          <IngredientsListItemRow key={uuidv4()} subIngredient={el} />
        ))}
    </li>
  );
}

IngredientsListItem.propTypes = {
  ingredient: PropTypes.string.isRequired,
};
