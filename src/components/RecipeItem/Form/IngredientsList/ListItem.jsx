/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from "prop-types";
// import { ErrorMessage } from "@hookform/error-message";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import QuantityInput from "./QuantityInput";
import UnitInput from "./UnitInput";
import NameInput from "./NameInput";
import Ingredient from "../../../../utils/Ingredient";
import "./ListItem.css";
import RecipeValidator from "../../../../utils/RecipeValidator";

export default function IngredientsListItem({
  ingredient,
  ingredientErrors,
  index,
  register,
}) {
  const { quantity, unit, name } = ingredient;
  return (
    <li>
      <div className="sub-ingredient">
        <div className="inputs-container">
          <QuantityInput
            ingredientQuantity={quantity}
            errorMessage={
              ingredientErrors &&
              ingredientErrors.quantity &&
              ingredientErrors.quantity.message
            }
            {...register(`ingredients.${index}.quantity`, {
              validate: RecipeValidator.getIngredientQuantityErrMsg,
            })}
          />
          <UnitInput
            ingredientUnit={unit}
            {...register(`ingredients.${index}.unit`)}
          />
          <NameInput
            ingredientName={name}
            errorMessage={
              ingredientErrors &&
              ingredientErrors.name &&
              ingredientErrors.name.message
            }
            {...register(`ingredients.${index}.name`, {
              validate: RecipeValidator.getIngredientNameErrMsg,
            })}
          />
          <div className="buttons-container">
            <FontAwesomeIcon
              icon={faTrashCan}
              size="lg"
              className="btn remove"
              title="Remove Ingredient"
            />
          </div>
        </div>
      </div>
      {/* <div className="ingredient-ingredientErrors-container">
        <ErrorMessage
          name={`ingredients.${index}.quantity`}
          ingredientErrors={ingredientErrors}
          render={({ message }) => (
            <p className="ingredient-err input-err-msg">
              <span className="bold">Quantity: </span>
              {message}
            </p>
          )}
        />
        <ErrorMessage
          name={`ingredients.${index}.name`}
          ingredientErrors={ingredientErrors}
          render={({ message }) => (
            <p className="ingredient-err input-err-msg">
              <span className="bold">Name: </span>
              {message}
            </p>
          )}
        />
      </div> */}
    </li>
  );
}

IngredientsListItem.propTypes = {
  ingredient: PropTypes.instanceOf(Ingredient),
  index: PropTypes.number.isRequired,
  ingredientErrors: PropTypes.object,
  register: PropTypes.func.isRequired,
};

IngredientsListItem.defaultProps = {
  ingredient: new Ingredient({ name: "", quantity: null, unit: null }),
  ingredientErrors: null,
};
