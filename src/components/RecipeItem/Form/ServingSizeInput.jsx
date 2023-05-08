import PropTypes from "prop-types";
import { TextField } from "@mui/material";
import "./ServingSizeInput.css";

export default function ServingSizeInput({ servingSize }) {
  const servingSizeMinQuantity = 0;
  const servingSizeMaxQuantity = 9999;
  const servingSizeUnitMaxLength = 100;

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
          InputProps={{
            inputProps: {
              min: servingSizeMinQuantity,
              max: servingSizeMaxQuantity,
            },
          }}
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
          InputProps={{
            inputProps: { maxLength: servingSizeUnitMaxLength },
          }}
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
