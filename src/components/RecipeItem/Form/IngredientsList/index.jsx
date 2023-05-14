import PropTypes from "prop-types";
import Ingredient from "../../../../utils/Ingredient";
import IngredientsListItem from "./ListItem";

export default function IngredientInputsList({
  ingredients,
  ingredientsErrors,
  register,
}) {
  console.log(ingredientsErrors);
  return (
    <ul id="ingredients-list">
      {ingredients.length ? (
        ingredients.map((ingredient, index) => (
          <IngredientsListItem
            key={ingredient.name}
            ingredientErrors={
              ingredientsErrors.length ? ingredientsErrors[index] : null
            }
            index={index}
            ingredient={ingredient}
            register={register}
          />
        ))
      ) : (
        <IngredientsListItem
          index={0}
          ingredientErrors={ingredientsErrors}
          register={register}
        />
      )}
    </ul>
  );
}

IngredientInputsList.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.instanceOf(Ingredient)).isRequired,
  ingredientsErrors: PropTypes.arrayOf(PropTypes.object).isRequired,
  register: PropTypes.func.isRequired,
};
