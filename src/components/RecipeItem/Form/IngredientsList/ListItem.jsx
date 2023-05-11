/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import QuantityInput from "./QuantityInput";
import UnitInput from "./UnitInput";
import NameInput from "./NameInput";
import Ingredient from "../../../../utils/Ingredient";
import "./ListItem.css";
import "./index.css";
import RecipeValidator from "../../../../utils/RecipeValidator";

export default function IngredientsListItem({ ingredient, index, register }) {
  const { quantity, unit, name } = ingredient;

  return (
    <li>
      <div className="sub-ingredient">
        <div className="inputs-container">
          <QuantityInput
            ingredientQuantity={quantity}
            {...register(`ingredientQuantity.${index}`, {
              validate: RecipeValidator.getIngredientQuantityErrMsg,
            })}
          />
          <UnitInput ingredientUnit={unit} />
          <NameInput ingredientName={name} />
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
    </li>
  );
}

IngredientsListItem.propTypes = {
  ingredient: PropTypes.instanceOf(Ingredient),
  index: PropTypes.number.isRequired,
  register: PropTypes.func.isRequired,
};

IngredientsListItem.defaultProps = {
  ingredient: new Ingredient({ name: "", quantity: null, unit: null }),
};
