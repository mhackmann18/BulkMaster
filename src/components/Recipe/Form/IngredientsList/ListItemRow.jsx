import PropTypes from "prop-types";
// import { TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import NumberInput from "../NumberInput";
import CookingUnitSelect from "./CookingUnitSelect";
import { standardFormUnits } from "../../../../utils/cookingUnit";
import "./index.css";

export default function IngredientsListItemRow({ subIngredient }) {
  const { quantity, unit, str } = subIngredient;

  return (
    <div className="sub-ingredient">
      <div className="inputs-container">
        <NumberInput
          startingValue={quantity}
          minValue={0}
          maxValue={99}
          variant="no-spinner-wheel"
          title="Quantity"
          name="ingredient-quantity"
          placeholder="Count"
        />
        <CookingUnitSelect unit={unit || ""} />
        {/* <TextField
          label="Name"
          variant="outlined"
          size="small"
          // error
          // helperText="Required Field"
          defaultValue={str}
        /> */}
        <input
          name="ingredient-name"
          className="ingredient-unit-input"
          title="Name"
          type="text"
          defaultValue={str}
        />
        <div className="buttons-container">
          <FontAwesomeIcon
            icon={faPlus}
            size="lg"
            className="btn"
            title="Add Alternative Ingredient"
          />
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
