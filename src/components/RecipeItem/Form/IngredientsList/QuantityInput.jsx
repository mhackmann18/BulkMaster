import { forwardRef } from "react";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";
import "./QuantityInput.css";

const QuantityInput = forwardRef(
  ({ ingredientQuantity, error, name, onChange, onBlur }, ref) => (
    <div className="ingredient-quantity-input-wrapper">
      <TextField
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        type="number"
        defaultValue={ingredientQuantity || ""}
        label="Quantity"
        variant="outlined"
        size="small"
        fullWidth
        error={error}
        InputProps={{
          inputProps: { step: "any" },
        }}
        inputRef={ref}
      />
    </div>
  )
);

QuantityInput.propTypes = {
  ingredientQuantity: PropTypes.number,
  error: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

QuantityInput.defaultProps = {
  ingredientQuantity: 0,
  error: false,
};

export default QuantityInput;
