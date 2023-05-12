import { forwardRef } from "react";
import PropTypes from "prop-types";
import { TextField, InputAdornment } from "@mui/material";
import "./Input.css";

const NutrientInput = forwardRef(
  ({ labelText, unit, quantity, name, onChange, onBlur }, ref) => {
    const minQuantity = 0;
    const maxQuantity = 9999;

    return (
      <div
        className="nutrient-input-wrapper"
        style={{
          width: `${(labelText.length + unit.length) / 2.3 + 3.6}rem`,
        }}
      >
        <TextField
          name={name}
          defaultValue={quantity || ""}
          variant="outlined"
          label={labelText}
          size="small"
          fullWidth
          onChange={onChange}
          onBlur={onBlur}
          type="number"
          max={maxQuantity}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">{unit}</InputAdornment>
            ),
            inputProps: { min: minQuantity, max: maxQuantity },
          }}
          inputRef={ref}
        />
      </div>
    );
  }
);

NutrientInput.propTypes = {
  labelText: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

export default NutrientInput;
