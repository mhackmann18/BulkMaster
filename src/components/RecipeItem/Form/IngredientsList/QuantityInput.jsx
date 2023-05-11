import { forwardRef } from "react";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";
import "./QuantityInput.css";

const QuantityInput = forwardRef(
  ({ ingredientQuantity, errorMessage, name, onChange, onBlur }, ref) => {
    const min = 0;
    const max = 9999;

    return (
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
          error={Boolean(errorMessage)}
          helperText={errorMessage}
          InputProps={{
            inputProps: { min, max, step: "any" },
          }}
          inputRef={ref}
        />
      </div>
    );
  }
);

QuantityInput.propTypes = {
  ingredientQuantity: PropTypes.number,
  errorMessage: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

QuantityInput.defaultProps = {
  ingredientQuantity: 0,
  errorMessage: "",
};

export default QuantityInput;
