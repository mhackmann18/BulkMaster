import PropTypes from "prop-types";
import { TextField } from "@mui/material";
import "./TitleInput.css";

export default function RecipeTitleInput({ value, errorMessage }) {
  return (
    <div className="recipe-title-input-wrapper">
      <TextField
        id="recipe-title-input"
        name="recipe-title"
        defaultValue={value}
        label="Recipe Title"
        variant="outlined"
        size="large"
        autoComplete="off"
        fullWidth
        error={Boolean(errorMessage)}
        helperText={errorMessage}
        required
        InputProps={{
          inputProps: { minLength: 1, maxLength: 70 },
        }}
      />
    </div>
  );
}

RecipeTitleInput.propTypes = {
  value: PropTypes.string,
  errorMessage: PropTypes.string,
};

RecipeTitleInput.defaultProps = {
  value: "",
  errorMessage: "",
};
