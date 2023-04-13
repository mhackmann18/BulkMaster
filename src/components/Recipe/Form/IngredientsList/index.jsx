import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { getNewIngredientString } from "../../../../utils/formatScrapedRecipe";
import IngredientsListItem from "./ListItem";

export default function IngredientInputsList({ ingredients }) {
  return (
    <ul id="ingredients-list">
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

IngredientInputsList.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
};
