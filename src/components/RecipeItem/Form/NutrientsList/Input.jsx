import PropTypes from "prop-types";
import { TextField, InputAdornment } from "@mui/material";
import Nutrient from "../../../../utils/Nutrient";
import "./Input.css";

export default function NutrientInput({ nutrient }) {
  const minQuantity = 0;
  const maxQuantity = 9999;

  return (
    <div
      className="nutrient-input-wrapper"
      style={{
        width: `${
          (nutrient.name.length + nutrient.unit.length) / 2.3 + 3.6
        }rem`,
      }}
    >
      <TextField
        name={`${nutrient.name}`}
        defaultValue={nutrient.quantity || ""}
        variant="outlined"
        label={nutrient.name}
        size="small"
        fullWidth
        type="number"
        max={maxQuantity}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">{nutrient.unit}</InputAdornment>
          ),
          inputProps: { min: minQuantity, max: maxQuantity },
        }}
      />
    </div>
  );
}

NutrientInput.propTypes = {
  nutrient: PropTypes.instanceOf(Nutrient).isRequired,
};
