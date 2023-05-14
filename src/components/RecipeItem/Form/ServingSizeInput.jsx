/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from "prop-types";
import { TextField } from "@mui/material";
// import { ErrorMessage } from "@hookform/error-message";
import RecipeValidator from "../../../utils/RecipeValidator";
import "./ServingSizeInput.css";

export default function ServingSizeInput({
  servingSize,
  register,
  servingSizeErrors,
}) {
  return (
    <>
      <div className="serving-size-input-container">
        <span className="serving-size-inputs-title">Serving Size:</span>
        <div className="serving-size-quantity-wrapper">
          <TextField
            {...register("servingSize.quantity", {
              validate: RecipeValidator.getServingSizeQuantityErrMsg,
            })}
            className="nowrap"
            type="number"
            defaultValue={servingSize.quantity || ""}
            label="Quantity"
            variant="outlined"
            size="small"
            fullWidth
            error={Boolean(servingSizeErrors && servingSizeErrors.quantity)}
            helperText={
              servingSizeErrors &&
              servingSizeErrors.quantity &&
              servingSizeErrors.quantity.message
            }
            InputProps={{
              inputProps: {
                // min: servingSizeMinQuantity,
                // max: servingSizeMaxQuantity,
                step: "any",
              },
            }}
          />
        </div>
        <div className="serving-size-unit-wrapper">
          <TextField
            {...register("servingSize.unit", {
              validate: RecipeValidator.getServingSizeUnitErrMsg,
            })}
            defaultValue={servingSize.unit || ""}
            label="Unit"
            variant="outlined"
            autoComplete="off"
            size="small"
            fullWidth
            error={Boolean(servingSizeErrors && servingSizeErrors.unit)}
            helperText={
              servingSizeErrors &&
              servingSizeErrors.unit &&
              servingSizeErrors.unit.message
            }
            // InputProps={{
            //   inputProps: { maxLength: servingSizeUnitMaxLength },
            // }}
          />
        </div>
      </div>
      {/* <div className="serving-size-err-container">
        <ErrorMessage
          errors={errors}
          name="servingSize.quantity"
          render={({ message }) => (
            <p className="input-err-msg serving-size-input-err">
              <span className="bold">Quantity: </span>
              {message}
            </p>
          )}
        />
        <ErrorMessage
          errors={errors}
          name="servingSize.unit"
          render={({ message }) => (
            <p className="input-err-msg serving-size-input-err">
              <span className="bold">Unit: </span>
              {message}
            </p>
          )}
        />
      </div> */}
    </>
  );
}

ServingSizeInput.propTypes = {
  servingSize: PropTypes.object,
  register: PropTypes.func.isRequired,
  servingSizeErrors: PropTypes.object,
};

ServingSizeInput.defaultProps = {
  servingSize: { quantity: "", unit: "" },
  servingSizeErrors: null,
};
