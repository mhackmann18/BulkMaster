import PropTypes from "prop-types";
import { TextField } from "@mui/material";
import "./NameInput.css";

export default function RecipeNameInput({ value }) {
  return (
    // <div id="recipe-name-input-wrapper">
    <div className="recipe-name-input-wrapper">
      <TextField
        id="recipe-title-input"
        name="recipe-title"
        defaultValue={value}
        label="Recipe Title"
        variant="outlined"
        size="large"
        autoComplete="off"
        fullWidth
        // error
        // helperText="Required Field"
      />
    </div>
  );
}

RecipeNameInput.propTypes = {
  value: PropTypes.string,
};

RecipeNameInput.defaultProps = {
  value: "",
};
