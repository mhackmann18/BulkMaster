import PropTypes from "prop-types";
import { TextField } from "@mui/material";
import "./QuantityInput.css";

export default function QuantityInput({ ingredientQuantity }) {
  const min = 0;
  const max = 9999;

  return (
    <div className="ingredient-quantity-input-wrapper">
      <TextField
        type="number"
        name="ingredient-quantity"
        defaultValue={ingredientQuantity || ""}
        label="Quantity"
        variant="outlined"
        size="small"
        fullWidth
        InputProps={{
          inputProps: { min, max },
        }}
      />
    </div>
  );
}

QuantityInput.propTypes = {
  ingredientQuantity: PropTypes.number,
};

QuantityInput.defaultProps = {
  ingredientQuantity: 0,
};
