import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import QuantityInput from "./QuantityInput";
// import { faPlus } from "@fortawesome/free-solid-svg-icons";
// import NumberInput from "../NumberInput";
import UnitInput from "./UnitInput";
import NameInput from "./NameInput";
import { standardFormUnits } from "../../../../utils/cookingUnit";
import "./ListItemRow.css";
import "./index.css";

export default function IngredientsListItemRow({ subIngredient }) {
  const { quantity, unit, str } = subIngredient;

  return (
    <div className="sub-ingredient">
      <div className="inputs-container">
        <QuantityInput ingredientQuantity={quantity} />
        <UnitInput ingredientUnit={unit} />
        <NameInput ingredientName={str} />
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
  );
}

IngredientsListItemRow.propTypes = {
  subIngredient: PropTypes.shape({
    quantity: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
    unit: PropTypes.oneOf([...standardFormUnits, null]),
    str: PropTypes.string.isRequired,
  }).isRequired,
};

// IngredientsListItemRow.defaultProps = {
//   subIngredient: {
//     quantity: null,
//     unit: null,
//     str: "",
//   },
// };
