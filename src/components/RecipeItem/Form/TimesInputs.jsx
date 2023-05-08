import PropTypes from "prop-types";
import { TextField, InputAdornment } from "@mui/material";
import "./TimesInputs.css";

export default function RecipeTimesInputs({ prepTime, cookTime }) {
  const minTimeInMinutes = 1;
  const maxTimeInMinutes = 9999;

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
            inputProps: { min: minTimeInMinutes, max: maxTimeInMinutes },
          }}
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
            inputProps: { min: minTimeInMinutes, max: maxTimeInMinutes },
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
