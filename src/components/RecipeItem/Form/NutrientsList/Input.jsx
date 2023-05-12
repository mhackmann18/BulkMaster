import PropTypes from "prop-types";
import { TextField, InputAdornment } from "@mui/material";
// import Nutrient from "../../../../utils/Nutrient";
import "./Input.css";

export default function NutrientInput({ name, unit, quantity }) {
  const minQuantity = 0;
  const maxQuantity = 9999;

  return (
    <div
      className="nutrient-input-wrapper"
      style={{
        width: `${(name.length + unit.length) / 2.3 + 3.6}rem`,
      }}
    >
      <TextField
        name={`${name}`}
        defaultValue={quantity || ""}
        variant="outlined"
        label={name}
        size="small"
        fullWidth
        type="number"
        max={maxQuantity}
        InputProps={{
          endAdornment: <InputAdornment position="end">{unit}</InputAdornment>,
          inputProps: { min: minQuantity, max: maxQuantity },
        }}
      />
    </div>
  );
}

NutrientInput.propTypes = {
  name: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
};
