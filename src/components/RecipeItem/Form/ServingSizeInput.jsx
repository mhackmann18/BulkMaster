import PropTypes from "prop-types";
import { TextField } from "@mui/material";
import "./ServingSizeInput.css";

export default function ServingSizeInput({ servingSize }) {
  return (
    <div id="serving-size-input-container">
      <p>Serving Size:</p>
      <div className="serving-size-input-wrapper">
        <TextField
          name="serving-size-quantity"
          defaultValue={servingSize.quantity || ""}
          label="Quantity"
          variant="outlined"
          size="small"
          fullWidth
          type="number"
        />
      </div>
      <div className="serving-size-input-wrapper">
        <TextField
          name="serving-size-unit"
          defaultValue={servingSize.unit || ""}
          label="Unit"
          variant="outlined"
          size="small"
          fullWidth
        />
      </div>
    </div>
  );
}

ServingSizeInput.propTypes = {
  servingSize: PropTypes.object,
};

ServingSizeInput.defaultProps = {
  servingSize: { quantity: "", unit: "" },
};
