/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from "prop-types";
import { TextField } from "@mui/material";
import "./ServingSizeInput.css";

export default function ServingSizeInput({ servingSize, register }) {
  const servingSizeMinQuantity = 0;
  const servingSizeMaxQuantity = 9999;
  const servingSizeUnitMaxLength = 100;

  return (
    <div id="serving-size-input-container">
      <span>Serving Size:</span>
      <div className="serving-size-quantity-wrapper">
        <TextField
          {...register("servingSize.quantity")}
          // name="serving-size-quantity"
          type="number"
          defaultValue={servingSize.quantity || ""}
          label="Quantity"
          variant="outlined"
          size="small"
          fullWidth
          InputProps={{
            inputProps: {
              min: servingSizeMinQuantity,
              max: servingSizeMaxQuantity,
              step: "any",
            },
          }}
        />
      </div>
      <div className="serving-size-unit-wrapper">
        <TextField
          {...register("servingSize.unit")}
          defaultValue={servingSize.unit || ""}
          label="Unit"
          variant="outlined"
          autoComplete="off"
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
  register: PropTypes.func.isRequired,
};

ServingSizeInput.defaultProps = {
  servingSize: { quantity: "", unit: "" },
};
