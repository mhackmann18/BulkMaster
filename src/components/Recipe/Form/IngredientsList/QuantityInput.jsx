import PropTypes from "prop-types";
import { TextField } from "@mui/material";
import "./QuantityInput.css";

export default function QuantityInput({ ingredientQuantity }) {
  return (
    <div className="ingredient-quantity-input-wrapper">
      <TextField
        type="number"
        name="ingredient-quantity"
        defaultValue={ingredientQuantity}
        label="Quantity"
        variant="outlined"
        size="small"
        fullWidth
      />
    </div>
  );
}

QuantityInput.propTypes = {
  ingredientQuantity: PropTypes.number,
};

QuantityInput.defaultProps = {
  ingredientQuantity: "",
};
