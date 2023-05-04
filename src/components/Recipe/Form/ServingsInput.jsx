import PropTypes from "prop-types";
import { TextField } from "@mui/material";
import "./ServingsInput.css";

export default function ServingsInput({ startingValue }) {
  return (
    <div className="servings-input-wrapper">
      <TextField
        name="servings-quantity"
        type="number"
        defaultValue={startingValue || ""}
        label="Servings"
        variant="outlined"
        size="small"
        fullWidth
        // error
        // helperText="Required Field"
      />
    </div>
  );
}

ServingsInput.propTypes = {
  startingValue: PropTypes.number,
};

ServingsInput.defaultProps = {
  startingValue: 0,
};
