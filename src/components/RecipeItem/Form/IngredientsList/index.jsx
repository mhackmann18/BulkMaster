import PropTypes from "prop-types";
import Ingredient from "../../../../utils/Ingredient";
import IngredientsListItem from "./ListItem";

export default function IngredientInputsList({
  ingredients,
  onIngredientRemoveClick,
  ingredientsErrors,
  register,
}) {
  return (
    <ul id="ingredients-list">
      {ingredients.length
        ? ingredients.map((ingredient) => (
            <IngredientsListItem
              key={ingredient.id}
              ingredient={ingredient}
              onRemoveClick={onIngredientRemoveClick}
              register={register}
              ingredientErrors={
                ingredientsErrors && ingredientsErrors[ingredient.id]
              }
            />
          ))
        : false}
    </ul>
  );
}

IngredientInputsList.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.instanceOf(Ingredient)).isRequired,
  onIngredientRemoveClick: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  ingredientsErrors: PropTypes.object,
};

IngredientInputsList.defaultProps = {
  ingredientsErrors: null,
};
