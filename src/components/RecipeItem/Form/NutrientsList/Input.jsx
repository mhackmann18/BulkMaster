import { forwardRef } from "react";
import PropTypes from "prop-types";
import { TextField, InputAdornment } from "@mui/material";
import "./Input.css";

const NutrientInput = forwardRef(
  (
    { labelText, unit, quantity, errorMessage, name, onChange, onBlur },
    ref
  ) => (
    <TextField
      name={name}
      defaultValue={quantity || ""}
      variant="outlined"
      style={{
        width: `${(labelText.length + unit.length) / 2.3 + 3.6}rem`,
      }}
      label={labelText}
      size="small"
      fullWidth
      onChange={onChange}
      onBlur={onBlur}
      type="number"
      error={Boolean(errorMessage)}
      helperText={errorMessage}
      InputProps={{
        endAdornment: <InputAdornment position="end">{unit}</InputAdornment>,
        // inputProps: { min: minQuantity, max: maxQuantity },
      }}
      inputRef={ref}
    />
  )
);

NutrientInput.propTypes = {
  labelText: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  errorMessage: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

NutrientInput.defaultProps = {
  errorMessage: "",
};

export default NutrientInput;
