import PropTypes from "prop-types";
import Ingredient from "../../../../utils/Ingredient";
import IngredientsListItem from "./ListItem";

export default function IngredientInputsList({ ingredients, register }) {
  return (
    <ul id="ingredients-list">
      {ingredients.length ? (
        ingredients.map((ingredient, index) => (
          <IngredientsListItem
            key={ingredient.name}
            index={index}
            ingredient={ingredient}
            register={register}
          />
        ))
      ) : (
        <IngredientsListItem index={0} register={register} />
      )}
    </ul>
  );
}

IngredientInputsList.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.instanceOf(Ingredient)).isRequired,
  register: PropTypes.func.isRequired,
};
