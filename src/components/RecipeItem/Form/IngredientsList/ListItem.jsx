/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from "prop-types";
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
  onRemoveClick,
  ingredientErrors,
  register,
}) {
  const { quantity, unit, name, id } = ingredient;

  const handleRemoveClick = () => {
    onRemoveClick(id);
  };

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
            {...register(`ingredients.${id}.quantity`, {
              validate: RecipeValidator.getIngredientQuantityErrMsg,
            })}
          />
          <UnitInput
            ingredientUnit={unit}
            {...register(`ingredients.${id}.unit`)}
          />
          <NameInput
            ingredientName={name}
            errorMessage={
              ingredientErrors &&
              ingredientErrors.name &&
              ingredientErrors.name.message
            }
            {...register(`ingredients.${id}.name`, {
              validate: RecipeValidator.getIngredientNameErrMsg,
            })}
          />
          <div className="buttons-container">
            <FontAwesomeIcon
              icon={faTrashCan}
              onClick={handleRemoveClick}
              size="lg"
              className="btn remove"
              title="Remove Ingredient"
            />
          </div>
        </div>
      </div>
    </li>
  );
}

IngredientsListItem.propTypes = {
  ingredient: PropTypes.instanceOf(Ingredient),
  onRemoveClick: PropTypes.func.isRequired,
  ingredientErrors: PropTypes.object,
  register: PropTypes.func.isRequired,
};

IngredientsListItem.defaultProps = {
  ingredient: new Ingredient({ name: "", quantity: null, unit: null }),
  ingredientErrors: null,
};
