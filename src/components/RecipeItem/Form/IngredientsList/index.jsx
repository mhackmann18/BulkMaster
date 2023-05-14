/* eslint-disable react/no-array-index-key */
import PropTypes from "prop-types";
import Ingredient from "../../../../utils/Ingredient";
import IngredientsListItem from "./ListItem";

export default function IngredientInputsList({
  ingredients,
  ingredientsErrors,
  register,
}) {
  return (
    <ul id="ingredients-list">
      {ingredients.length
        ? ingredients.map((ingredient, index) => (
            <IngredientsListItem
              key={index}
              ingredientErrors={
                ingredientsErrors.length ? ingredientsErrors[index] : null
              }
              index={index}
              ingredient={ingredient}
              register={register}
            />
          ))
        : false}
    </ul>
  );
}

IngredientInputsList.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.instanceOf(Ingredient)).isRequired,
  ingredientsErrors: PropTypes.arrayOf(PropTypes.object).isRequired,
  register: PropTypes.func.isRequired,
};
