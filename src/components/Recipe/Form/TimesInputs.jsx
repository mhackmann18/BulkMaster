import PropTypes from "prop-types";
import { TextField, InputAdornment } from "@mui/material";
import "./TimesInputs.css";

export default function RecipeTimesInputs({ prepTime, cookTime }) {
  return (
    <>
      <div className="recipe-time-inputs-container">
        <TextField
          name="prep-time"
          type="number"
          defaultValue={prepTime || ""}
          label="Prep Time"
          variant="outlined"
          size="small"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">minutes</InputAdornment>
            ),
          }}
          // error
          // helperText="Required Field"
        />
      </div>
      <div className="recipe-time-inputs-container">
        <TextField
          name="cook-time"
          type="number"
          defaultValue={cookTime || ""}
          label="Cook Time"
          variant="outlined"
          size="small"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">minutes</InputAdornment>
            ),
          }}
        />
      </div>
    </>
  );
}

RecipeTimesInputs.propTypes = {
  prepTime: PropTypes.number,
  cookTime: PropTypes.number,
};

RecipeTimesInputs.defaultProps = {
  prepTime: 0,
  cookTime: 0,
};
