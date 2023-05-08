import PropTypes from "prop-types";
import { TextField, InputAdornment } from "@mui/material";
import Nutrient from "../../../../utils/Nutrient";
import "./Input.css";

export default function NutrientInput({ nutrient }) {
  return (
    <div className="nutrient-input-wrapper">
      <TextField
        name="nutrient"
        defaultValue={nutrient.quantity || ""}
        variant="outlined"
        label={nutrient.name}
        size="small"
        // fullWidth
        type="number"
        max={9999}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">{nutrient.unit}</InputAdornment>
          ),
        }}
      />
    </div>
  );
}

NutrientInput.propTypes = {
  nutrient: PropTypes.instanceOf(Nutrient).isRequired,
};
