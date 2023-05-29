import { forwardRef } from "react";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
// import { v4 as uuidv4 } from "uuid";
import {
  standardFormUnits,
  standardFormUnitsPlural,
} from "../../../../utils/cookingUnit";
import "./UnitInput.css";

const UnitInput = forwardRef(
  ({ ingredientUnit, name, onChange, onBlur }, ref) => (
    // <select
    //   className="ingredient-unit-select"
    //   name="ingredient-unit"
    //   title="Unit"
    //   defaultValue={unit}
    // >
    <div className="ingredient-unit-select-wrapper">
      <TextField
        name={name}
        // id={name}
        onChange={onChange}
        onBlur={onBlur}
        select
        size="small"
        label="Unit"
        defaultValue={ingredientUnit || ""}
        fullWidth
        inputRef={ref}
      >
        {["", ...standardFormUnits].map((el) => (
          <MenuItem key={el} value={el}>
            {el}
          </MenuItem>
        ))}
      </TextField>
    </div>
    // </select>
  )
);

UnitInput.propTypes = {
  ingredientUnit: PropTypes.oneOf([
    "",
    ...standardFormUnits,
    ...standardFormUnitsPlural,
  ]),
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

UnitInput.defaultProps = {
  ingredientUnit: "",
};

export default UnitInput;
